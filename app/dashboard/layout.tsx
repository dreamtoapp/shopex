import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { UserRole } from '@prisma/client';
import NotificationPortal from '@/components/ui/NotificationPortal';
// Removed ServiceWorkerRegistration - web push notifications disabled
import AdminNotificationWrapper from '@/app/components/AdminNotificationWrapper';
import DashboardFooter from './components/DashboardFooter';
import { getPendingOrdersCount } from './helpers/navigationMenu';
import { getCompanyHealthStatus } from '@/actions/getCompanyHealthStatus';
import { SidebarProvider } from '@/components/ui/sidebar';
import BusinessSidebar from './components/BusinessSidebar';
import DashboardTopHeader from './components/DashboardTopHeader';
import { SidebarInset } from '@/components/ui/sidebar';

export default async function LayoutNew({ children }: { children: React.ReactNode }) {
    // This layout is used for the dashboard pages
    const session = await auth();
    // Fix: Accept both string and enum for role, and handle legacy lowercase roles
    const userRole = (session?.user as { role?: string })?.role;
    if (!session?.user || (userRole !== UserRole.ADMIN && userRole !== 'ADMIN')) {
        return redirect('/auth/login');
    }

    // Fetch pending orders count and company health status for navigation
    const [pendingOrdersCount, companyStatus] = await Promise.all([
        getPendingOrdersCount(),
        getCompanyHealthStatus()
    ]);

    // Hardcode RTL for now; in the future, detect from language/i18n
    return (
        <SidebarProvider>
            <div className='flex min-h-screen w-full bg-background' dir='rtl'>
                <BusinessSidebar pendingOrdersCount={pendingOrdersCount} />
                <SidebarInset>
                    <DashboardTopHeader companyStatus={companyStatus} />
                    <main className='w-full flex-1 bg-background p-6 flex flex-col'>
                        {children}
                    </main>
                    <DashboardFooter />
                </SidebarInset>
            </div>

            {/* Notification Components */}
            <NotificationPortal />
            {/* ServiceWorkerRegistration removed - web push notifications disabled */}
            <AdminNotificationWrapper />
        </SidebarProvider>
    );
} 