import { Module } from "@nestjs/common";
import { OrderRepository } from "src/sale/infrastructure/repositories/order/order.repository";
import { OutboxMessageRepository } from "src/sale/infrastructure/repositories/outbox-message/outbox-message.repository";
import { PlaceOrderController } from "./place-order.controller";
import { CreateOrderHandler } from "./place-order.service";

@Module({
    controllers: [PlaceOrderController],
    providers: [
        CreateOrderHandler,
        OrderRepository,
        OutboxMessageRepository
    ],
})

export class PlaceOrderModule { }