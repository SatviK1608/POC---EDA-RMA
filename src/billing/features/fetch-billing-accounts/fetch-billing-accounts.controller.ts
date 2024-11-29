import { Controller, Get, Param } from '@nestjs/common';
import { FetchBillingAccountHandler } from './fetch-billing-accounts.service';

@Controller('api/v1/billing/accounts')
export class FetchBillingAccountController {

    constructor(
        private readonly handler: FetchBillingAccountHandler
    ) { }

    @Get('/')
    async getBillingAccounts() {
        return await this.handler.getBillingAccounts();
    }

}
