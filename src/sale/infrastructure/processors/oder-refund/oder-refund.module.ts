import { Module } from '@nestjs/common';
import { InboxMessageRepository } from '../../repositories/inbox-message/inbox-message.repository';
import { HandleOrderRefunded } from './oder-refund';
import { OrderRepository } from '../../repositories/order/order.repository';

@Module({
  imports: [
    
  ],
  providers: [
    HandleOrderRefunded,
    InboxMessageRepository,
    OrderRepository
  ],
})
export class OrderRefundedModule {}
