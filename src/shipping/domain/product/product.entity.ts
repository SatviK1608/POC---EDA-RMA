import {
    Entity,
    PrimaryColumn,
    Column
  } from 'typeorm';
  
  @Entity('shipping_product')
  export class Product {
    @PrimaryColumn({ type: 'uuid', unique: true })
    product_id: string;
  
    @Column({ type: 'integer', nullable: false })
    quantity_on_hand: number;

  }
  