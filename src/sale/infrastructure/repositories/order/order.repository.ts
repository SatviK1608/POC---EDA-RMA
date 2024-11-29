import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Order } from 'src/sale/domain/order/order.entity';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  async storeOrder(
    payload: any,
    transaction: EntityManager = null,
  ) {
    if (transaction) {
      return await transaction.save(Order, payload);
    }

    return await this.save(payload);
  }

  async updateOrder(
    payload: any,
    orderId: string,
    transaction: EntityManager = null
  ) {

    if (transaction) {
      return await transaction.update(Order, orderId, payload);
    }

    return await this.update(orderId, payload);

  }

  async getOrderById(orderId: string) {
    return await this.findOneBy({ order_id: orderId });
  }

  async getOrders() {
    return await this.find();
  }
}
