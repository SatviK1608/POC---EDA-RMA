import { Injectable } from '@nestjs/common';
import { OrderPlacedProcessor } from './oder-placed/oder-placed';
import { OrderBackProcessor } from './back-order/back-order';

@Injectable()
export class SignatureTypes {
  constructor(
    private readonly orderPlacedProcessor: OrderPlacedProcessor,
    private readonly orderBackProcessor: OrderBackProcessor,
  ) { }
  public signatureTypes: Record<string, any[]> = {
    'sales.order_placed': [this.orderPlacedProcessor],
    'shipping.back_ordered': [this.orderBackProcessor],
    'oder.shipped': [],

  };

  public getSignatureTypes(): Record<string, any[]> {
    return this.signatureTypes;
  }
}
