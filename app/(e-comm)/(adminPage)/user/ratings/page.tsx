import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { auth } from '@/auth';
import { getUserReviews } from '@/app/(e-comm)/(home-page-sections)/product/actions/rating';
import { getUserAppRatings } from './actions/ratingActions';
import RatingsClient from './components/RatingsClient';

export const metadata = {
    title: 'تقييماتي ومراجعاتي | المتجر الإلكتروني',
    description: 'عرض وإدارة تقييماتك للمنتجات والمتجر',
};

// Loading component
function RatingsLoading() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="h-40 bg-muted rounded-lg" />
            <div className="h-32 bg-muted rounded-lg" />
            <div className="h-32 bg-muted rounded-lg" />
        </div>
    );
}

export default async function RatingsPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect('/auth/signin');
    }

    // Get real data from backend
    const [productReviews, appRatings] = await Promise.all([
        getUserReviews(session.user.id),
        getUserAppRatings(session.user.id)
    ]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Main Content */}
            <Suspense fallback={<RatingsLoading />}>
                <RatingsClient
                    productReviews={productReviews}
                    appRatings={appRatings}
                />
            </Suspense>
        </div>
    );
} 