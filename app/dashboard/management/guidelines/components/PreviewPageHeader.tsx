'use client';

import { Button } from '@/components/ui/button';
import Link from '@/components/link';
import { Icon } from '@/components/icons/Icon';

export default function PreviewPageHeader() {
    return (
        <div className="mb-6 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Icon name="Eye" className="h-6 w-6" />
                    معاينة الصفحة الرئيسية
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    هذه معاينة لكيفية ظهور الصفحة الرئيسية للعملاء
                </p>
            </div>
            <Link href="/dashboard/management/guidelines">
                <Button variant="outline" className="flex items-center gap-2">
                    <Icon name="ArrowLeft" className="h-4 w-4" />
                    العودة إلى الدليل
                </Button>
            </Link>
        </div>
    );
}






