export type OrderNotificationType = 'order_shipped' | 'order_delivered';

export interface OrderNotificationTemplate {
  title: string;
  body: string;
}

export const ORDER_NOTIFICATION_TEMPLATES = {
  ORDER_SHIPPED: (orderNumber: string): OrderNotificationTemplate => ({
    title: '🚚 تم شحن طلبك',
    body: `تم شحن طلبك رقم ${orderNumber} بنجاح!`
  }),
  
  ORDER_DELIVERED: (orderNumber: string): OrderNotificationTemplate => ({
    title: '✅ تم توصيل طلبك',
    body: `تم توصيل طلبك رقم ${orderNumber} بنجاح!`
  })
}; 