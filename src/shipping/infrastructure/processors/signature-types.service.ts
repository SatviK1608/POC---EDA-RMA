import { Injectable } from '@nestjs/common';
import { HandleOrderBilled } from './oder-billed/oder-billed';
import { HandleOrderPlaced } from './oder-placed/oder-placed';
import { HandleOrderValidate } from './oder-validate/oder-validate';

@Injectable()
export class SignatureTypes {
  constructor(
    private readonly handleOrderBilled: HandleOrderBilled,
    private readonly handleOrderPlaced: HandleOrderPlaced,
    private readonly handleOrderValidate: HandleOrderValidate,
  ) { }
  public signatureTypes: Record<string, any[]> = {
    'sales.order_placed': [
      this.handleOrderPlaced, this.handleOrderValidate
    ],
    'billing.order_billed': [
      this.handleOrderBilled, this.handleOrderValidate
    ],
    'billing.payment_failed': [],

  };

  public getSignatureTypes(): Record<string, any[]> {
    return this.signatureTypes;
  }
}
