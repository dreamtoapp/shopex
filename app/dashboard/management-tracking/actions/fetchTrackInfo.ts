'use server';

import db from '@/lib/prisma';

export const fetchTrackInfo = async (orderid: string) => {
  try {
    // Validate orderid format
    if (!orderid || typeof orderid !== 'string' || orderid.trim().length === 0) {
      return null;
    }

    // Fetch order details without driver tracking
    const order = await db.order.findUnique({
      where: { id: orderid.trim() },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            phone: true
          }
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                imageUrl: true
              }
            }
          }
        }
      }
    });

    if (!order) {
      return null;
    }

    return {
      order,
      latitude: null,
      longitude: null
    };
  } catch (error) {
    console.error('Error fetching track info:', error);
    return null;
  }
}; 