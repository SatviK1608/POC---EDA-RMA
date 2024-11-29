import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BillingModule } from './billing/billing.module';
import { SaleModule } from './sale/sale.module';
import { ShippingModule } from './shipping/shipping.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './common/ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => dataSourceOptions(configService),
      inject: [ConfigService],
    }),
    BillingModule,
    ShippingModule,
    SaleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
