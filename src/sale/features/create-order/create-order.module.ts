import { Module } from "@nestjs/common";
import { CreateOrderController } from "./create-order.controller";
import { CreateOrderHandler } from "./create-order.service";
import { OrderRepository } from "src/sale/infrastructure/repositories/order/order.repository";
import { OutboxMessageRepository } from "src/sale/infrastructure/repositories/outbox-message/outbox-message.repository";
import { ProductRepository } from "src/sale/infrastructure/repositories/product/product.repository";

@Module({
    controllers: [CreateOrderController],
    providers: [
        CreateOrderHandler,
        OrderRepository,
        OutboxMessageRepository,
        ProductRepository
    ],
})

export class CreateOrderModule { }