import { ImageResponse } from 'next/og';
import { companyInfo } from '@/app/(e-comm)/actions/companyDetail';
import { readFile } from 'fs/promises';
import { join } from 'path';

// Apple icon metadata (180x180 is recommended for iOS)
export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

// Apple touch icon generation
export default async function AppleIcon() {
  try {
    // Fetch company logo from database
    const company = await companyInfo();
    const logoUrl = company?.logo;

    // If logo exists, try to fetch and render it
    if (logoUrl && logoUrl.trim() !== '') {
      try {
        // Verify the logo URL is accessible
        const logoResponse = await fetch(logoUrl, {
          next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (logoResponse.ok) {
          // Convert image to base64 for use in ImageResponse
          const logoBuffer = await logoResponse.arrayBuffer();
          const logoBase64 = Buffer.from(logoBuffer).toString('base64');
          const contentType = logoResponse.headers.get('content-type') || 'image/png';
          const logoDataUrl = `data:${contentType};base64,${logoBase64}`;

          return new ImageResponse(
            (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'white',
                  borderRadius: '22px',
                }}
              >
                {/* @ts-ignore - ImageResponse supports img with data URLs */}
                <img
                  src={logoDataUrl}
                  width={180}
                  height={180}
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </div>
            ),
            {
              ...size,
            }
          );
        }
      } catch (fetchError) {
        console.warn('Failed to fetch company logo for apple icon, using fallback:', fetchError);
        // Fall through to fallback design
      }
    }
  } catch (error) {
    console.warn('Failed to get company info for apple icon, using fallback:', error);
    // Fall through to fallback design
  }

  // Fallback: use the same fallback logo image as the main logo
  try {
    // Read the fallback logo file directly from public folder
    const fallbackLogoPath = join(process.cwd(), 'public', 'fallback', 'dreamToApp2-dark.png');
    const fallbackBuffer = await readFile(fallbackLogoPath);
    const fallbackBase64 = fallbackBuffer.toString('base64');
    const fallbackDataUrl = `data:image/png;base64,${fallbackBase64}`;

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
            borderRadius: '22px',
          }}
        >
          {/* @ts-ignore - ImageResponse supports img with data URLs */}
          <img
            src={fallbackDataUrl}
            width={180}
            height={180}
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (fallbackError) {
    console.warn('Failed to read fallback logo for apple icon:', fallbackError);
    // Fall through to final fallback
  }

  // Final fallback: use gradient design with company name initials
  let fallbackText = 'DTA'; // Default to "Dream To App"
  
  try {
    const company = await companyInfo();
    if (company?.fullName && company.fullName.trim() !== '') {
      // Get initials from company name (first letter of each word, max 3 letters)
      const words = company.fullName.trim().split(/\s+/);
      fallbackText = words
        .slice(0, 3)
        .map((word: string) => word[0]?.toUpperCase() || '')
        .join('')
        .substring(0, 3) || 'DTA';
    }
  } catch (error) {
    // Use default DTA if company fetch fails
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 72,
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #2196f3, #1976d2)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '22px',
          textTransform: 'uppercase',
        }}
      >
        {fallbackText}
      </div>
    ),
    {
      ...size,
    }
  );
}
