import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from 'src/billing/infrastructure/repositories/orders/order.repository';
import { CreateOrderCommand } from './create-order.dto';

@Injectable()
export class CreateOrderHandler {

    constructor(
        @InjectRepository(OrderRepository)
        private readonly repository: OrderRepository,
    ) { }

    public async handle(data: CreateOrderCommand) {
        await this.repository.storeOrder(data);
        return { message: 'Order created successfully' };
    }
}
