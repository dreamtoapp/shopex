'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Icon } from '@/components/icons/Icon';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/formatCurrency';
import { Button } from '@/components/ui/button';
import { Eye, MessageCircle, Star } from 'lucide-react';
import type { MockHeroSlide, MockPromotion, MockCategory, MockProduct } from './mockHomepageData';

interface HomepagePreviewProps {
    heroSlides: MockHeroSlide[];
    promotions: MockPromotion[];
    categories: MockCategory[];
    products: MockProduct[];
}

// Section Hint Overlay Component
function SectionHint({ title, description }: { title: string; description: string }) {
    return (
        <div className="absolute top-2 right-2 z-30 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-lg shadow-lg border border-primary/50">
            <div className="flex items-center gap-2">
                <Icon name="Info" className="h-3 w-3 flex-shrink-0" />
                <div className="text-xs">
                    <div className="font-semibold">{title}</div>
                    <div className="text-primary-foreground/80 text-[10px] leading-tight mt-0.5">{description}</div>
                </div>
            </div>
        </div>
    );
}

// Helper function to show toast for clickable elements
const showPreviewAlert = (message: string) => {
    toast.info(message, {
        description: 'هذه معاينة - في الموقع الفعلي سيتم تنفيذ الإجراء',
        duration: Infinity, // Don't auto-close
        closeButton: true, // Show close button
    });
};

// Mock Hero Slider Component
function MockHeroSlider({ slides }: { slides: MockHeroSlide[] }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const currentSlideData = slides[currentSlide];

    const handlePrevSlide = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
        showPreviewAlert('زر التنقل: الانتقال إلى الشريحة السابقة في البانر الرئيسي');
    };

    const handleNextSlide = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentSlide((currentSlide + 1) % slides.length);
        showPreviewAlert('زر التنقل: الانتقال إلى الشريحة التالية في البانر الرئيسي');
    };

    const handleSlideIndicator = (index: number) => (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentSlide(index);
        showPreviewAlert(`نقطة التنقل: الانتقال مباشرة إلى الشريحة ${index + 1} في البانر الرئيسي`);
    };

    return (
        <section className="relative overflow-hidden rounded-2xl shadow-2xl" aria-label="Hero banner preview">
            <SectionHint 
                title="قسم البانر الرئيسي" 
                description="يعرض العروض والصور الترويجية الكبيرة"
            />
            <div className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
                <div className="absolute inset-0">
                    <Image
                        src={currentSlideData.imageUrl}
                        alt={currentSlideData.header || 'Hero Slide'}
                        fill
                        className="object-cover transition-all duration-700"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </div>
                {slides.length > 1 && (
                    <>
                        <button
                            onClick={handlePrevSlide}
                            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                            aria-label="الشريحة السابقة"
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </button>
                        <button
                            onClick={handleNextSlide}
                            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                            aria-label="الشريحة التالية"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </button>
                        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={handleSlideIndicator(index)}
                                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all min-h-[32px] min-w-[32px] flex items-center justify-center ${
                                        index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                                    }`}
                                    aria-label={`الانتقال إلى الشريحة ${index + 1}`}
                                >
                                    <span className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-transparent'}`} />
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

// Mock Promotions Component
function MockPromotions({ promotions }: { promotions: MockPromotion[] }) {
    const handleOfferClick = (offerName: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        showPreviewAlert(`بطاقة العرض "${offerName}": في الموقع الفعلي، سيتم توجيه العميل إلى صفحة تفاصيل العرض لعرض المنتجات المشمولة في هذا العرض`);
    };

    return (
        <section className="space-y-6 relative" aria-label="Featured promotions">
            <SectionHint 
                title="قسم العروض" 
                description="يعرض العروض الترويجية والخصومات النشطة"
            />
            <div className="flex items-center gap-2 pb-2">
                <h2 className="text-xl font-bold text-foreground">العروض المميزة</h2>
                <Badge variant="outline">
                    {promotions.length}
                </Badge>
            </div>
            <ScrollArea className="w-full max-w-full overflow-x-auto pb-2">
                <div className="flex flex-row gap-4">
                    {promotions.map((offer) => (
                        <div
                            key={offer.id}
                            onClick={handleOfferClick(offer.name)}
                            className="block min-w-[320px] max-w-xs overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <div className="relative aspect-square overflow-hidden">
                                {offer.imageUrl ? (
                                    <Image
                                        src={offer.imageUrl}
                                        alt={offer.name}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="h-full w-full bg-gradient-to-r from-primary/30 to-primary/10" />
                                )}
                                {offer.discountPercentage && (
                                    <span className="absolute right-3 top-3 rounded-full bg-destructive px-3 py-1 text-sm font-bold text-destructive-foreground shadow">
                                        {offer.discountPercentage}% خصم
                                    </span>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="mb-2 text-lg font-semibold flex items-center gap-2">
                                    {offer.name}
                                    {Array.isArray(offer.productAssignments) && (
                                        offer.productAssignments.length > 0 ? (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-feature-products-soft text-feature-products border border-feature-products">
                                                {offer.productAssignments.length} منتج
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-muted">
                                                لا توجد منتجات بعد
                                            </span>
                                        )
                                    )}
                                </h3>
                                {offer.description && (
                                    <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                                        {offer.description}
                                    </p>
                                )}
                                <button className="mt-3 w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow text-center hover:bg-primary/90">
                                    تفاصيل العرض
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" className="h-2" />
            </ScrollArea>
        </section>
    );
}

// Mock Categories Component
function MockCategories({ categories }: { categories: MockCategory[] }) {
    const handleCategoryClick = (categoryName: string, productCount: number) => (e: React.MouseEvent) => {
        e.preventDefault();
        showPreviewAlert(`بطاقة التصنيف "${categoryName}": في الموقع الفعلي، سيتم توجيه العميل إلى صفحة التصنيف لعرض جميع المنتجات في هذه الفئة (${productCount} منتج)`);
    };

    return (
        <section className="space-y-6 relative" aria-label="Product categories">
            <SectionHint 
                title="قسم التصنيفات" 
                description="يعرض فئات المنتجات المتاحة للتصفح"
            />
            <div className="flex items-center justify-between pb-1">
                <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-foreground">تسوق حسب الفئة</h2>
                        <Badge variant="outline">
                            {categories.length}
                        </Badge>
                    </div>
                    <p className="hidden md:block text-sm text-muted-foreground">استكشف مجموعتنا المتنوعة من المنتجات حسب الفئة</p>
                </div>
            </div>
            <Card>
                <CardContent className="px-4 py-2">
                    <ScrollArea className="w-full py-1">
                        <nav aria-label="قائمة الفئات">
                            <ul className="flex gap-5 pb-1">
                                {categories.map((category) => (
                                    <li
                                        key={category.id}
                                        onClick={handleCategoryClick(category.name, category.productCount)}
                                        className="min-w-[9rem] md:min-w-[18rem] border border-border/50 px-1 rounded-xl cursor-pointer hover:shadow-md transition-all"
                                    >
                                        <div className="flex flex-col items-center gap-1 px-0.5 w-full pt-2">
                                            <h3 className="text-sm md:text-xl font-semibold text-muted-foreground truncate w-full text-center">
                                                {category.name}
                                            </h3>
                                        </div>
                                        <div className="relative h-32 w-32 md:h-44 md:w-44 overflow-hidden rounded-3xl shadow-md transition-all duration-300 bg-gray-900/80 flex items-center justify-center mx-auto mt-1">
                                            {category.imageUrl ? (
                                                <Image
                                                    src={category.imageUrl}
                                                    alt={category.name}
                                                    fill
                                                    className="object-contain p-1.5 rounded-3xl"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
                                            )}
                                        </div>
                                        <div className="w-full flex justify-between items-center px-1 pb-2 mt-2">
                                            <Badge
                                                variant="outline"
                                                className="text-muted-foreground text-xs px-2 py-1 font-normal flex items-center gap-1 border border-secondary"
                                            >
                                                {category.productCount > 0 ? (
                                                    <>
                                                        <Icon name="Package" className="h-3 w-3" />
                                                        {category.productCount}
                                                    </>
                                                ) : (
                                                    'قريبا'
                                                )}
                                            </Badge>
                                            <Badge variant="outline" className="inline-flex items-center text-muted-foreground justify-center rounded-full p-1 hover:bg-primary/10 transition">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </Badge>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <ScrollBar orientation="horizontal" className="h-2 [&>div]:bg-primary/30" />
                    </ScrollArea>
                </CardContent>
            </Card>
        </section>
    );
}

// Mock Product Card Component
function MockProductCard({ product }: { product: MockProduct }) {
    const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
    const discountPercentage = hasDiscount && product.compareAtPrice
        ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
        : 0;

    const handleProductClick = (e: React.MouseEvent) => {
        e.preventDefault();
        showPreviewAlert(`بطاقة المنتج "${product.name}": في الموقع الفعلي، سيتم توجيه العميل إلى صفحة تفاصيل المنتج لعرض المعلومات الكاملة والسعر وإضافة المنتج إلى السلة`);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        showPreviewAlert(`زر "أضف إلى السلة": في الموقع الفعلي، سيتم فتح نافذة لتأكيد إضافة المنتج "${product.name}" إلى سلة التسوق`);
    };

    return (
        <Card
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card to-card/95 shadow-xl border-none w-full flex flex-col cursor-pointer"
            onClick={handleProductClick}
        >
            {/* Media Section - Aspect Square */}
            <div className="relative w-full aspect-square">
                <div className="relative w-full h-full overflow-hidden rounded-t-xl bg-white">
                    {product.imageUrl ? (
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover transition-all duration-300 hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                            <Icon name="Package" className="h-12 w-12 text-muted-foreground" />
                        </div>
                    )}
                    {/* Discount Badge */}
                    {hasDiscount && (
                        <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs font-bold z-10">
                            -{discountPercentage}%
                        </Badge>
                    )}
                    {/* Quick View Button */}
                    <div className="absolute top-2 left-2 z-10">
                        <Button
                            variant="secondary"
                            size="icon"
                            className="w-10 h-10 bg-white/90"
                            onClick={(e) => {
                                e.stopPropagation();
                                showPreviewAlert(`زر المعاينة السريعة: في الموقع الفعلي، سيتم فتح نافذة معاينة سريعة لعرض تفاصيل المنتج "${product.name}"`);
                            }}
                        >
                            <Eye className="w-4 h-4 text-primary" />
                        </Button>
                    </div>
                </div>
            </div>
            {/* Content Section */}
            <div className="flex-1 flex flex-col p-4 gap-3 min-h-[160px]">
                {/* Product Name & Price */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm sm:text-base leading-tight text-foreground line-clamp-2" title={product.name}>
                            {product.name}
                        </h3>
                    </div>
                    {/* Price Section */}
                    <div className="flex items-center gap-3">
                        <span className="text-lg sm:text-xl font-bold text-feature-commerce">
                            {formatCurrency(product.price, 'SAR')}
                        </span>
                        {hasDiscount && product.compareAtPrice && (
                            <span className="text-sm line-through text-muted-foreground/70">
                                {formatCurrency(product.compareAtPrice, 'SAR')}
                            </span>
                        )}
                    </div>
                </div>

                {/* Analytics Footer */}
                <div className="pt-2 text-center border-t border-border/20">
                    <div className="flex items-center justify-center gap-4 text-sm py-2">
                        {/* Rating */}
                        {product.reviewCount !== undefined && product.reviewCount > 0 && (
                            <span className="flex items-center gap-1 text-yellow-500">
                                <Star className="w-4 h-4 fill-current" fill="currentColor" />
                                <span className="text-foreground font-medium">4.5</span>
                            </span>
                        )}
                        {/* Comments */}
                        {product.reviewCount !== undefined && product.reviewCount > 0 && (
                            <span className="flex items-center gap-1 text-muted-foreground">
                                <MessageCircle className="w-4 h-4" />
                                <span className="font-medium">{product.reviewCount}</span>
                            </span>
                        )}
                        {/* Preview count */}
                        <span className="flex items-center gap-1 text-primary-foreground">
                            <Eye className="w-4 h-4" />
                            <span className="font-medium">123</span>
                        </span>
                    </div>
                </div>

                {/* Add to Cart Button */}
                <div className="flex flex-col gap-2 mt-auto" onClick={e => e.stopPropagation()}>
                    <Button
                        onClick={handleAddToCart}
                        variant="default"
                        size="lg"
                        className="w-full flex items-center justify-center gap-2 font-bold text-lg"
                    >
                        <Icon name="ShoppingCart" size="md" />
                        <span className="hidden sm:inline font-semibold text-lg">أضف إلى السلة</span>
                    </Button>
                </div>
            </div>
        </Card>
    );
}

// Mock Products Grid Component
function MockProductsGrid({ products }: { products: MockProduct[] }) {
    return (
        <section className="space-y-6 relative" aria-label="Featured products">
            <SectionHint 
                title="قسم المنتجات" 
                description="يعرض قائمة المنتجات المتاحة للشراء"
            />
            <h2 className="text-xl font-semibold flex items-center gap-2">
                المنتجات <Badge variant="outline">{products.length}</Badge>
            </h2>
            <ul className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5" aria-label="قائمة المنتجات">
                {products.map((product) => (
                    <li key={product.id}>
                        <MockProductCard product={product} />
                    </li>
                ))}
            </ul>
        </section>
    );
}

// Main Preview Component
export default function HomepagePreview({ heroSlides, promotions, categories, products }: HomepagePreviewProps) {
    return (
        <>
            <MockHeroSlider slides={heroSlides} />
            <div className="container mx-auto flex flex-col gap-8 bg-background text-foreground px-4 sm:px-6 lg:px-8" dir="rtl">
                <p className="text-sm text-muted-foreground mt-4">
                    تسوق أحدث العروض والتصنيفات المختارة بعناية للحصول على أفضل المنتجات بأسعار تنافسية.
                </p>
                <MockPromotions promotions={promotions} />
                <MockCategories categories={categories} />
                <MockProductsGrid products={products} />
            </div>
        </>
    );
}

