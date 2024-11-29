import { Module } from "@nestjs/common";
import { CreateOrderController } from "./create-order.controller";
import { CreateOrderHandler } from "./create-order.service";
import { OrderRepository } from "src/billing/infrastructure/repositories/orders/order.repository";

@Module({
    controllers: [CreateOrderController],
    providers: [
        CreateOrderHandler, OrderRepository
    ],
})

export class CreateOrderModule { }