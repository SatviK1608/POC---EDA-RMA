import { Injectable } from '@nestjs/common';
import { Order } from 'src/shipping/domain/order/order.entity';
import { CreateOrderCommand } from 'src/shipping/features/create-order/create-order.dto';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  async storeOrder(payload: CreateOrderCommand, transaction: EntityManager = null) {
    if (transaction) {
      return await transaction.save(Order, payload);
    }
    return await this.save(payload);
  }

  async getOrderById(orderId: string, transaction: EntityManager = null) {
    if (transaction) {
      return await transaction.findOneBy(Order, { order_id: orderId });
    }
    return await this.findOneBy({
      order_id: orderId,
    });
  }

  async updateOrder(
    payload: { isPlaced?: boolean , isBilled?: boolean },
    orderId: string,
    transaction: EntityManager = null
  ) {

    if (transaction) {
      return await transaction.update(Order, orderId, payload);
    }

    return await this.update(orderId, payload);

  }


}
