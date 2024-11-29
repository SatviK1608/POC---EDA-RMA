import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateOrderModule } from './features/create-order/create-order.module';
import { PlaceOrderModule } from './features/place-order/place-order.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CreateOrderModule,
    PlaceOrderModule
  ],
  controllers: [],
  providers: [],
})
export class SaleModule {}
