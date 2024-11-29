import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { StorageFileHandlerService } from '../../storage/file-storage-service';
import { DriveConfigurationService } from '../../storage/drive-config';
import { BillingAccount } from 'src/billing/domain/billing-account/billing-account.entity';
import { JsonMessageParserService } from '../../json-parser/json-parser.service';


export default class BillingAccountSeeder implements Seeder {
    private storageService: StorageFileHandlerService;
    private configService: ConfigService;
    private programsSeedFilePath: string;
    private fileName: string = 'billing_accounts.json';
    track?: boolean = true;
    constructor() {
        this.storageService = new StorageFileHandlerService(
            new ConfigService(),
            new DriveConfigurationService(),
            new JsonMessageParserService(),
        );
        this.configService = new ConfigService();
        this.programsSeedFilePath =
            this.configService.get<string>('SEED_FILES_PATH') + this.fileName;
    }
    async run(dataSource: DataSource): Promise<void> {
        const repository = dataSource.getRepository(BillingAccount);
        const products = await this.storageService.getFile(
            this.programsSeedFilePath,
        );
        await repository.insert(products);
    }
}