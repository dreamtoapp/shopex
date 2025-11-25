'use client';

import Link from 'next/link';
import { Icon } from '@/components/icons/Icon';
import DashboardIconWithNotification from '@/components/DashboardIconWithNotification';
import AppHealthIconServer from '@/components/AppHealthIconServer';
import DashboardClientHeader from '../management-dashboard/components/DashboardClientHeader';
import { CompanyDataStatus } from '@/helpers/companyDataValidator';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface DashboardTopHeaderProps {
  companyStatus: CompanyDataStatus;
}

export default function DashboardTopHeader({ companyStatus }: DashboardTopHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="flex items-center gap-2 md:gap-3 rounded-lg px-2.5 py-1.5 bg-background/60">
          <DashboardIconWithNotification companyStatus={companyStatus} />
          <AppHealthIconServer status={companyStatus} />
          <div>
            <DashboardClientHeader />
          </div>
          <Link href="/" className="flex items-center">
            <Icon name="Store" className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </Link>
        </div>
      </div>
    </header>
  );
}



