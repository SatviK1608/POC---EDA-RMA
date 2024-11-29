import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillingAccountRepository } from 'src/billing/infrastructure/repositories/billing-account/billing-account.repository';

@Injectable()
export class FetchBillingAccountHandler {

    constructor(
        @InjectRepository(BillingAccountRepository)
        private readonly repository: BillingAccountRepository,
    ) { }

    public async getBillingAccounts() {
        return await this.repository.getBillingAccounts();
    }
}
