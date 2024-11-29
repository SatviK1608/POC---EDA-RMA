import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from 'src/sale/infrastructure/repositories/order/order.repository';
import { CreateOrderCommand } from './create-order.dto';
import { ProductRepository } from 'src/sale/infrastructure/repositories/product/product.repository';

@Injectable()
export class CreateOrderHandler {

    constructor(
        @InjectRepository(OrderRepository)
        private readonly repository: OrderRepository,

        @InjectRepository(ProductRepository)
        private readonly productRepository: ProductRepository

    ) { }

    public async handle(data: CreateOrderCommand) {
        let total = 0
        await Promise.all(data.products.map(async (product) => {
            const productData = await this.productRepository.getProduct(product.product_id);
            total += productData?.price * product.quantity;
        }))
        await this.repository.storeOrder({total_amount: total, products: data.products, customer_id: data.customer_id, order_id: data.order_id});
        return { message: 'Order created successfully' };
    }

    public async getOrders() {
        return await this.repository.getOrders();
    }
}
