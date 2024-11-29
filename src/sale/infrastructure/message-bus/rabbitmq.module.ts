import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OutboxMessageRepository } from 'src/sale/infrastructure/repositories/outbox-message/outbox-message.repository';
import { OutboxMessageRelay } from './outbox-message-relay.service';
import { ProducerService } from './rabbitmq/workers/producer.service';
import { RabbitmqConfigService } from './rabbitmq/config/rabbitmq-config.service';
import { InboxMessageRepository } from 'src/sale/infrastructure/repositories/inbox-message/inbox-message.repository';
import { InboxMessageHandler } from './inbox-message-handler.service';
import { SignatureTypes } from 'src/sale/infrastructure/processors/signature-types.service';
import { ConsumerService } from './rabbitmq/workers/consumer.service';
import { DispatchMessages } from './cli-commands/dispatch-messages';
import { HandleMessages } from './cli-commands/handle-messages';
import { RabbitmqConfigurerService } from './rabbitmq/config/rabbitmq-configurer.service';
import { RabbitmqConnectionService } from './rabbitmq/config/rabbitmq-connection.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/common/ormconfig';
import { HandleOrderBilled } from '../processors/oder-billed/oder-billed';
import { OderBilledModule } from '../processors/oder-billed/oder-billed.module';
import { OrderRepository } from '../repositories/order/order.repository';
import { HandlePaymentFailed } from '../processors/payment-failed/payment-failed-billed';
import { OrderRefundedModule } from '../processors/oder-refund/oder-refund.module';
import { HandleOrderRefunded } from '../processors/oder-refund/oder-refund';
import { HandleOrderShipped } from '../processors/oder-shipped/oder-shipped';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => dataSourceOptions(configService),
      inject: [ConfigService],
    }),
    OderBilledModule,
    OrderRefundedModule
  ],
  providers: [
    DispatchMessages,
    OrderRepository,
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
    HandleOrderBilled,
    HandlePaymentFailed,
    HandleOrderRefunded,
    HandleOrderShipped,
  ],
})
export class RabbitmqModule {}
