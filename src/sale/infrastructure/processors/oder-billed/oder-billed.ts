import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/sale/domain/order/order.entity';
import { InboxMessageRepository } from 'src/sale/infrastructure/repositories/inbox-message/inbox-message.repository';
import { DataSource } from 'typeorm';
import { OrderRepository } from '../../repositories/order/order.repository';
import { OrderStatus } from 'src/sale/domain/order/enums/status-enum';


export class HandleOrderBilled {
    constructor(
        @InjectDataSource()
        private dataSource: DataSource,
        
        @InjectRepository(OrderRepository)
        private orderRepository: OrderRepository,

        @InjectRepository(InboxMessageRepository)
        private inboxMessageRepository: InboxMessageRepository,
    ) { }

    getHandlerName(): string {
        return this.constructor.name;
    }

    async handleEvent(payload: any) {
        await this.dataSource.transaction(async (transaction) => {

            const message = payload.body?.data;

            await this.orderRepository.updateOrder({ status: OrderStatus.BILLED }, message.order_id, transaction);

            await this.inboxMessageRepository.storeInboxMessage(
                {
                    message_id: payload.messageId,
                    handler_name: this.getHandlerName(),
                },
                transaction,
            );
        });
    }
}
