import { Module } from '@nestjs/common';
import { InboxMessageRepository } from '../../repositories/inbox-message/inbox-message.repository';
import { HandleOrderBilled } from './oder-billed';
import { OrderRepository } from '../../repositories/order/order.repository';

@Module({
  imports: [
    
  ],
  providers: [
    HandleOrderBilled,
    InboxMessageRepository,
    OrderRepository
  ],
})
export class OderBilledModule {}
