import HomepagePreview from '../components/HomepagePreview';
import { getAllPreviewImages } from '../actions/getPreviewImages';
import { generateMockHeroSlides, generateMockPromotions, generateMockCategories, generateMockProducts } from '../components/mockHomepageData';
import PreviewPageHeader from '../components/PreviewPageHeader';

export default async function PreviewPage() {
    // Fetch images dynamically from preview folders
    const previewImages = await getAllPreviewImages();

    // Generate mock data from the fetched images
    const mockHeroSlides = generateMockHeroSlides(previewImages.hero);
    const mockPromotions = generateMockPromotions(previewImages.offers);
    const mockCategories = generateMockCategories(previewImages.category);
    const mockProducts = generateMockProducts(previewImages.product);

    return (
        <div className="min-h-screen bg-background p-6" dir="rtl">
            <PreviewPageHeader />
            <HomepagePreview 
                heroSlides={mockHeroSlides}
                promotions={mockPromotions}
                categories={mockCategories}
                products={mockProducts}
            />
        </div>
    );
}

