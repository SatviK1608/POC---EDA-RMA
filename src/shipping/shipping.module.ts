import { Module } from '@nestjs/common';
import { CreateOrderModule } from './features/create-order/create-order.module';
import { FetchProductsModule } from './features/fetch-products/fetch-products.module';

@Module({
  imports: [
    CreateOrderModule, 
    FetchProductsModule
  ],
  controllers: [],
  providers: [],
})
export class ShippingModule {}
