import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBillingAccounts1721202789721 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'billing_billing_account',
        columns: [
          {
            name: 'billing_account_id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'balance',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'card_number',
            type: 'varchar',
            length: '16',
            isNullable: false,
          }
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('billing_accounts');
  }
}
