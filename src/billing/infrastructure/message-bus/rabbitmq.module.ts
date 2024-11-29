import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OutboxMessageRepository } from 'src/billing/infrastructure/repositories/outbox-message/outbox-message.repository';
import { OutboxMessageRelay } from './outbox-message-relay.service';
import { ProducerService } from './rabbitmq/workers/producer.service';
import { RabbitmqConfigService } from './rabbitmq/config/rabbitmq-config.service';
import { InboxMessageRepository } from 'src/billing/infrastructure/repositories/inbox-message/inbox-message.repository';
import { InboxMessageHandler } from './inbox-message-handler.service';
import { SignatureTypes } from 'src/billing/infrastructure/processors/signature-types.service';
import { ConsumerService } from './rabbitmq/workers/consumer.service';
import { DispatchMessages } from './cli-commands/dispatch-messages';
import { HandleMessages } from './cli-commands/handle-messages';
import { RabbitmqConfigurerService } from './rabbitmq/config/rabbitmq-configurer.service';
import { RabbitmqConnectionService } from './rabbitmq/config/rabbitmq-connection.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/common/ormconfig';
import { OrderRepository } from '../repositories/orders/order.repository';
import { BillingAccountRepository } from '../repositories/billing-account/billing-account.repository';
import { OrderPlacedProcessor } from '../processors/oder-placed/oder-placed';
import { OrderBackProcessor } from '../processors/back-order/back-order';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => dataSourceOptions(configService),
      inject: [ConfigService],
    }),
  ],
  providers: [
    DispatchMessages,
    HandleMessages,
    RabbitmqConfigService,
    RabbitmqConfigurerService,
    RabbitmqConnectionService,
    ProducerService,
    OutboxMessageRepository,
    OutboxMessageRelay,
    ConsumerService,
    InboxMessageHandler,
    SignatureTypes,
    InboxMessageRepository,
    OrderRepository,
    BillingAccountRepository,
    OutboxMessageRepository,
    InboxMessageRepository,
    OrderPlacedProcessor,
    OrderBackProcessor,

  ],
})
export class RabbitmqModule {}
