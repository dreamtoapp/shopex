import { fetchTrackInfo } from '../actions/fetchTrackInfo';
import RefreshButton from '../components/RefreshButton';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/icons/Icon';
import { formatCurrency, CurrencyCode } from '@/lib/formatCurrency';
import db from '@/lib/prisma';

export default async function Page({ params }: { params: Promise<{ orderid: string }> }) {
    const { orderid } = await params;
    const trackInfo = await fetchTrackInfo(orderid);

    // Get company currency setting
    const company = await db.company.findFirst();
    const currency = (company?.defaultCurrency || 'SAR') as CurrencyCode;

    if (!trackInfo) {
        return (
            <div className="min-h-screen w-full bg-background p-4 md:p-6">
                <div className="mx-auto max-w-lg w-full">
                    {/* Removed: <BackButton variant="floating" className="mb-6" /> */}

                    <Card className="shadow-xl border-l-4 border-l-feature-commerce card-hover-effect">
                        <CardHeader className="text-center pb-4">
                            <div className="flex justify-center mb-4">
                                <div className="p-4 bg-feature-commerce-soft rounded-full">
                                    <Icon name="AlertCircle" className="h-12 w-12 text-feature-commerce animate-pulse" />
                                </div>
                            </div>
                            <CardTitle className="text-xl text-feature-commerce">معلومات الطلبية</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center space-y-4">
                            <p className="text-muted-foreground">
                                عرض تفاصيل الطلبية.
                            </p>
                            <Badge variant="outline" className="text-feature-commerce border-feature-commerce">
                                تفاصيل الطلبية
                            </Badge>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    // Calculate order status and progress
    const orderStatus = trackInfo?.order?.status || 'pending';
    void orderStatus;

    return (
        <div className="min-h-screen w-full bg-background p-4 md:p-6">
            <div className="mx-auto max-w-4xl space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    {/* Removed: <BackButton variant="gradient" /> */}
                    <div className="flex items-center gap-3">
                        <Badge
                            variant="default"
                            className="bg-feature-commerce text-white"
                        >
                            <Icon name="Package" className="h-3 w-3 mr-1" />
                            تفاصيل الطلبية
                        </Badge>
                        <RefreshButton />
                    </div>
                </div>

                {/* Order Header Card */}
                <Card className="shadow-lg border-l-4 border-l-feature-commerce card-hover-effect">
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Icon name="Package" className="h-5 w-5 text-feature-commerce icon-enhanced" />
                            طلبية رقم: {trackInfo?.order.orderNumber || 'غير متوفر'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-feature-users-soft">
                                <Icon name="User" className="h-5 w-5 text-feature-users" />
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium">العميل</p>
                                    <p className="font-semibold text-feature-users">
                                        {trackInfo?.order.customer?.name || 'غير محدد'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-lg bg-feature-commerce-soft">
                                <Icon name="DollarSign" className="h-5 w-5 text-feature-commerce" />
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium">إجمالي المبلغ</p>
                                    <p className="font-semibold text-feature-commerce">
                                        {trackInfo?.order.amount ? formatCurrency(trackInfo.order.amount, currency) : 'غير محدد'}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                    {/* Order Timeline Card */}
                    <Card className="shadow-lg border-l-4 border-l-feature-analytics card-hover-effect">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <Icon name="Clock" className="h-5 w-5 text-feature-analytics icon-enhanced" />
                                مراحل الطلبية
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Timeline items */}
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <div>
                                        <p className="font-medium">تم إنشاء الطلبية</p>
                                        <p className="text-xs text-muted-foreground">
                                            {trackInfo?.order.createdAt ? new Date(trackInfo.order.createdAt).toLocaleString('ar-SA') : 'غير محدد'}
                                        </p>
                                    </div>
                                </div>


                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                                    <div>
                                        <p className="font-medium text-muted-foreground">تم التوصيل</p>
                                        <p className="text-xs text-muted-foreground">في انتظار التسليم</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>


                {/* Order Items Card */}
                {trackInfo?.order.items && trackInfo.order.items.length > 0 && (
                    <Card className="shadow-lg border-l-4 border-l-feature-products card-hover-effect">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <Icon name="Package" className="h-5 w-5 text-feature-products icon-enhanced" />
                                محتويات الطلبية ({trackInfo.order.items.length} منتج)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {trackInfo.order.items.map((item: any, index: number) => (
                                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-feature-products rounded-full"></div>
                                            <div>
                                                <p className="font-medium">{item.product?.name || 'منتج غير محدد'}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    الكمية: {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-left">
                                            <p className="font-semibold text-feature-products">
                                                {item.price ? formatCurrency(item.price, currency) : 'غير محدد'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
} 