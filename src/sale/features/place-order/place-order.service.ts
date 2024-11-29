import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from 'src/sale/domain/order/enums/status-enum';
import { OrderPlaced } from 'src/sale/domain/order/event/order-placed';
import { OrderRepository } from 'src/sale/infrastructure/repositories/order/order.repository';
import { OutboxMessageRepository } from 'src/sale/infrastructure/repositories/outbox-message/outbox-message.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class CreateOrderHandler {

    constructor(
        @InjectRepository(OrderRepository)
        private orderRepository: OrderRepository,
        @InjectRepository(OutboxMessageRepository)
        private outboxMessageRepository: OutboxMessageRepository,
        private dataSource: DataSource
    ) { }

    public async handle(data: { order_id: string }) {
        return await this.dataSource.transaction(async transactionalEntityManager => {
            await this.orderRepository.updateOrder({ status: OrderStatus.PLACED }, data.order_id, transactionalEntityManager);
            const product = await this.orderRepository.getOrderById(data.order_id);

            await this.outboxMessageRepository
                .storeOutboxMessage(new OrderPlaced(product),
                    transactionalEntityManager);
            return { message: 'Order placed successfully' };
        });

    }
}
