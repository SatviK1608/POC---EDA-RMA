import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignatureTypes } from 'src/billing/infrastructure/processors/signature-types.service';
import { jsonrepair } from 'jsonrepair';
import { InboxMessageRepository } from 'src/billing/infrastructure/repositories/inbox-message/inbox-message.repository';
import { RabbitMQConsumeMessage } from './rabbitmq/rabbitmq.interface';

@Injectable()
export class InboxMessageHandler {
  constructor(
    private readonly signatureTypes: SignatureTypes,
    @InjectRepository(InboxMessageRepository)
    private inboxMessageRepository: InboxMessageRepository,
  ) {}

  getSignatureType() {
    return Object.keys(this.signatureTypes.getSignatureTypes());
  }

  robustParseMessageContent(message: RabbitMQConsumeMessage) {
    try {
      return JSON.parse(message.content.toString());
    } catch (err) {
      console.warn('WARNING: Failed to parse message content initially');
      return this.repairMessageContent(message);
    }
  }

  repairMessageContent(message: RabbitMQConsumeMessage) {
    try {
      const repairedMessage = jsonrepair(message?.content?.toString() || '{}');
      return JSON.parse(repairedMessage);
    } catch (repairError) {
      console.error(
        `ERROR: Failed to repair and parse message ${message?.properties?.messageId}. Content:`,
        message?.content?.toString(),
        'Repair error details:',
        repairError,
      );
      return {};
    }
  }

  async handleMessage(
    message: RabbitMQConsumeMessage,
    max_retry_counts: number,
  ) {
    const messageId = message.properties.messageId;
    const message_type =
      message.properties.type || message.properties.headers.type;
    const signatureTypes = this.signatureTypes.getSignatureTypes();
    const handlers = signatureTypes[message_type];
    for (const handler of handlers) {
      let retryCount = max_retry_counts;
      const duplicateMessage =
        await this.inboxMessageRepository.getDuplicateInboxMessage(
          messageId,
          handler.getHandlerName(),
        );
      if (duplicateMessage) {
        console.log(
          `INFO Message with id ${messageId} already handled with ${handler.getHandlerName()}. Duplicate message ignored.`,
        );
        continue;
      }
      const parsedMessage = this.robustParseMessageContent(message);

      console.log(
        'INFO Handling message with the following parsed content:',
        parsedMessage,
      );

      const message_obj = {
        messageId: messageId,
        body: parsedMessage,
      };

      let err: Error;

      while (retryCount >= 0) {
        try {
          console.log(
            `INFO Handling message with messageId: ${messageId} and handler ${handler.getHandlerName()}`,
          );
          await handler.handleEvent(message_obj);
          console.log(`INFO Message ${messageId} handled successfully.`);
          break;
        } catch (error) {
          retryCount--;
          err = error;
        }
      }

      if (retryCount < 0) throw err;
    }
  }
}
