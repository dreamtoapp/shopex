'use server';

import db from '@/lib/prisma';
import { OrderStatus } from '@prisma/client';

export interface OrderCounts {
  total: number;
  pending: number;
  delivered: number;
  canceled: number;
}

export async function getOrderCounts(): Promise<OrderCounts> {
  try {
    const [
      total,
      pending,
      delivered,
      canceled
    ] = await Promise.all([
      db.order.count(),
      db.order.count({ where: { status: OrderStatus.PENDING } }),
      db.order.count({ where: { status: OrderStatus.DELIVERED } }),
      db.order.count({ where: { status: OrderStatus.CANCELED } })
    ]);

    return {
      total,
      pending,
      delivered,
      canceled
    };
  } catch (error) {
    console.error('Error fetching order counts:', error);
    return {
      total: 0,
      pending: 0,
      delivered: 0,
      canceled: 0
    };
  }
} 