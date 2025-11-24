// Mock data for homepage preview simulation
// Images are now loaded dynamically from /public/preview/ folders
// Just add/remove images in the folders and they will appear automatically!

// Helper function to generate image path
export const getImagePath = (folder: string, filename: string) => `/preview/${folder}/${filename}`;

export interface MockHeroSlide {
    id: string;
    header?: string;
    subheader?: string;
    imageUrl: string;
    ctaText: string;
    ctaLink: string;
    discountPercentage?: number;
    isActive: boolean;
}

export interface MockPromotion {
    id: string;
    name: string;
    slug: string;
    isActive: boolean;
    imageUrl?: string;
    discountPercentage?: number;
    productAssignments?: { product: any }[];
    description?: string;
}

export interface MockCategory {
    id: string;
    name: string;
    slug: string;
    imageUrl?: string;
    productCount: number;
}

export interface MockProduct {
    id: string;
    name: string;
    slug: string;
    price: number;
    compareAtPrice?: number;
    imageUrl?: string;
    outOfStock: boolean;
    manageInventory: boolean;
    stockQuantity?: number;
    type?: string;
    reviewCount?: number;
}

// Generate hero slides from image files array
const heroHeaders = [
    'اكتشف مجموعتنا الحصرية',
    'عروض خاصة محدودة',
    'خصومات مميزة',
    'عروض نهاية الموسم',
    'عروض الجمعة البيضاء',
    'عروض رمضان',
];

const heroSubheaders = [
    'منتجات عالية الجودة بأفضل الأسعار',
    'خصومات تصل إلى 70% على منتجات مختارة',
    'تسوق الآن واحصل على أفضل العروض',
    'لا تفوت الفرصة',
    'عروض حصرية لفترة محدودة',
    'خصومات كبيرة على جميع المنتجات',
];

export function generateMockHeroSlides(imageFiles: string[]): MockHeroSlide[] {
    return imageFiles.map((filename, index) => ({
        id: `mock-hero-${index + 1}`,
        header: heroHeaders[index] || `عرض ${index + 1}`,
        subheader: heroSubheaders[index] || 'تسوق الآن',
        imageUrl: getImagePath('hero', filename),
        ctaText: 'تسوق الآن',
        ctaLink: '/categories',
        discountPercentage: 50 + (index * 10),
        isActive: true,
    }));
}

// Generate promotions from image files array
const offerNames = [
    'عرض الصيف الكبير',
    'عرض نهاية الموسم',
    'عرض خاص للمشتركين',
    'عرض الجمعة البيضاء',
    'عرض رمضان المبارك',
    'عرض التخفيضات الكبيرة',
];

const offerDescriptions = [
    'خصم 30% على جميع منتجات الصيف',
    'خصومات كبيرة على منتجات مختارة',
    'عروض حصرية للمشتركين في النشرة الإخبارية',
    'خصومات تصل إلى 60% على جميع المنتجات',
    'عروض خاصة لشهر رمضان',
    'تخفيضات على جميع الفئات',
];

const offerDiscounts = [30, 50, 25, 60, 40, 35];

export function generateMockPromotions(imageFiles: string[]): MockPromotion[] {
    return imageFiles.map((filename, index) => ({
        id: `mock-promo-${index + 1}`,
        name: offerNames[index] || `عرض ${index + 1}`,
        slug: `offer-${index + 1}`,
        isActive: true,
        imageUrl: getImagePath('offers', filename),
        discountPercentage: offerDiscounts[index] || 30,
        productAssignments: Array.from({ length: Math.max(1, 4 - index) }, () => ({ product: {} })),
        description: offerDescriptions[index] || `عرض مميز ${index + 1}`,
    }));
}

// Generate categories from image files array
// Each category uses a different image from the folder
const categoryNames = [
    'إلكترونيات',
    'ملابس',
    'أجهزة منزلية',
    'أطعمة ومشروبات',
    'ألعاب وترفيه',
    'كتب ومكتبات',
    'رياضة ولياقة',
    'جمال وصحة',
    'سفر وسياحة',
    'أدوات منزلية',
];

const categoryProductCounts = [45, 32, 18, 27, 15, 22, 19, 28, 12, 35];

export function generateMockCategories(imageFiles: string[]): MockCategory[] {
    return imageFiles.map((filename, index) => ({
        id: `mock-cat-${index + 1}`,
        name: categoryNames[index] || `فئة ${index + 1}`,
        slug: (categoryNames[index] || `category-${index + 1}`).toLowerCase().replace(/\s+/g, '-'),
        imageUrl: getImagePath('category', filename),
        productCount: categoryProductCounts[index] || Math.floor(Math.random() * 50) + 10,
    }));
}

// Generate products from image files array
const productPrices = [299.99, 149.50, 89.99, 199.00, 79.99, 249.99, 159.99, 349.99, 129.99, 199.99, 179.99, 219.99];
const productComparePrices = [399.99, undefined, 129.99, undefined, 99.99, undefined, 199.99, 449.99, undefined, 249.99, undefined, 299.99];
const productStockQuantities = [15, 8, undefined, 3, 22, undefined, 12, 5, 18, 7, 10, 14];
const productReviewCounts = [24, 12, 7, 18, 31, 5, 15, 9, 22, 11, 16, 20];
const productTypes = ['electronics', 'clothing', 'home', 'food', 'electronics', 'clothing', 'electronics', 'home', 'food', 'clothing', 'electronics', 'home'];

export function generateMockProducts(imageFiles: string[]): MockProduct[] {
    return imageFiles.map((filename, index) => ({
        id: `mock-prod-${index + 1}`,
        name: `منتج مثال ${index + 1}`,
        slug: `product-example-${index + 1}`,
        price: productPrices[index] || 99.99,
        compareAtPrice: productComparePrices[index],
        imageUrl: getImagePath('product', filename),
        outOfStock: false,
        manageInventory: index % 3 !== 2,
        stockQuantity: productStockQuantities[index],
        type: productTypes[index] || 'electronics',
        reviewCount: productReviewCounts[index] || 0,
    }));
}

