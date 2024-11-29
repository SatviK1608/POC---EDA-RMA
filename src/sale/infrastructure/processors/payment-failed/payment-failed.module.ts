import { Module } from '@nestjs/common';
import { InboxMessageRepository } from '../../repositories/inbox-message/inbox-message.repository';
import { HandlePaymentFailed } from './payment-failed-billed';
import { OrderRepository } from '../../repositories/order/order.repository';

@Module({
  imports: [
    
  ],
  providers: [
    HandlePaymentFailed,
    InboxMessageRepository,
    OrderRepository
  ],
})
export class OderBilledModule {}
