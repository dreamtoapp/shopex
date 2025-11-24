'use server';

import { readdir } from 'fs/promises';
import { join } from 'path';

const PREVIEW_BASE_PATH = join(process.cwd(), 'public', 'preview');

export async function getPreviewImages(folder: 'hero' | 'offers' | 'category' | 'product'): Promise<string[]> {
    try {
        const folderPath = join(PREVIEW_BASE_PATH, folder);
        const files = await readdir(folderPath);
        
        // Filter only image files and sort them
        const imageFiles = files
            .filter(file => {
                const ext = file.toLowerCase().split('.').pop();
                return ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif'].includes(ext || '');
            })
            .sort(); // Sort alphabetically for consistent ordering
        
        return imageFiles;
    } catch (error) {
        console.error(`Error reading preview images from ${folder}:`, error);
        return [];
    }
}

export async function getAllPreviewImages() {
    try {
        const [heroImages, offerImages, categoryImages, productImages] = await Promise.all([
            getPreviewImages('hero'),
            getPreviewImages('offers'),
            getPreviewImages('category'),
            getPreviewImages('product'),
        ]);

        return {
            hero: heroImages,
            offers: offerImages,
            category: categoryImages,
            product: productImages,
        };
    } catch (error) {
        console.error('Error reading all preview images:', error);
        return {
            hero: [],
            offers: [],
            category: [],
            product: [],
        };
    }
}


