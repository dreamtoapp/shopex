'use server';

// Using direct string values to match database

export type OrderAnalytics = {
  inWayOrders: number;
};

export async function fetchAnalytics(): Promise<OrderAnalytics> {
  try {
    // IN_TRANSIT status removed - return 0 for backward compatibility
    const analytics = {
      inWayOrders: 0,
    };

    return analytics;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    // Return default analytics on error
    return {
      inWayOrders: 0,
    };
  }
}




