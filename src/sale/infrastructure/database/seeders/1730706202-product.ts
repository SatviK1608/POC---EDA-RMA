import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JsonMessageParserService } from 'src/sale/infrastructure/json-parser/json-parser.service';
import { StorageFileHandlerService } from 'src/sale/infrastructure/storage/file-storage-service';
import { DriveConfigurationService } from 'src/sale/infrastructure/storage/drive-config';
import { ProductSales } from 'src/sale/domain/product/product.entity';

export default class SalesProductSeeder implements Seeder {
  private storageService: StorageFileHandlerService;
  private configService: ConfigService;
  private programsSeedFilePath: string;
  private fileName: string = 'sales_products.json';
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
    const repository = dataSource.getRepository(ProductSales);
    const products = await this.storageService.getFile(
        this.programsSeedFilePath,
    );
    await repository.insert(products);
  }
}