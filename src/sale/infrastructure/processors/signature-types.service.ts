import { Injectable } from '@nestjs/common';
import { HandleOrderBilled } from './oder-billed/oder-billed';
import { HandlePaymentFailed } from './payment-failed/payment-failed-billed';
import { HandleOrderRefunded } from './oder-refund/oder-refund';
import { HandleOrderShipped } from './oder-shipped/oder-shipped';

@Injectable()
export class SignatureTypes {
  constructor(
    private readonly handleOrderBilled: HandleOrderBilled,
    private readonly handlePaymentFailed: HandlePaymentFailed,
    private readonly handleOrderRefunded: HandleOrderRefunded,
    private readonly handleOrderShipped: HandleOrderShipped,
  ) { }
  public signatureTypes: Record<string, any[]> = {
    'billing.payment_failed': [this.handlePaymentFailed],
    'billing.order_billed': [this.handleOrderBilled],
    'billing.order_refunded': [
      this.handleOrderRefunded
    ],
    'shipping.shipping_label_created': [
      this.handleOrderShipped
    ],

  };

  public getSignatureTypes(): Record<string, any[]> {
    return this.signatureTypes;
  }
}
