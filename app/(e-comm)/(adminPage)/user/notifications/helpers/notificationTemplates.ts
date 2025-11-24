/**
 * Pre-built notification templates for common ORDER events
 */
import { formatCurrency, CurrencyCode } from '@/lib/formatCurrency';

export const ORDER_NOTIFICATION_TEMPLATES = {
  NEW_ORDER: (orderNumber: string, customerName: string, total: number, currency: CurrencyCode = 'SAR') => ({
    title: '🛒 طلب جديد',
    body: `طلب جديد #${orderNumber} بقيمة ${formatCurrency(total, currency)} من ${customerName}`,
  }),

  ORDER_SHIPPED: (orderNumber: string) => ({
    title: '🚚 تم شحن طلبك',
    body: `طلبك رقم ${orderNumber} تم شحنه بنجاح!`,
  }),

  ORDER_DELIVERED: (orderNumber: string) => ({
    title: 'تم توصيل طلبك بنجاح ✅',
    body: `تم توصيل طلبك ${orderNumber} بنجاح. شكراً لاختيارك متجرنا!`,
  }),

  ORDER_CANCELLED: (orderNumber: string, reason?: string) => ({
    title: 'تم إلغاء طلبك',
    body: `تم إلغاء طلبك ${orderNumber}${reason ? ` - ${reason}` : ''}. سيتم استرداد المبلغ إلى محفظتك.`,
  })
}; 