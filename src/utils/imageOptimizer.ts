/**
 * Image optimization utilities
 */

/**
 * Get optimized image dimensions based on viewport size
 * @param originalWidth Original image width
 * @param originalHeight Original image height
 * @param viewportWidth Current viewport width
 * @returns Optimized dimensions
 */
export const getOptimizedImageDimensions = (
  originalWidth: number,
  originalHeight: number,
  viewportWidth: number
): { width: number; height: number } => {
  // Calculate aspect ratio
  const aspectRatio = originalWidth / originalHeight;
  
  // Calculate maximum width based on viewport
  // For mobile devices, use full viewport width
  // For larger screens, limit to reasonable size
  let maxWidth = viewportWidth;
  if (viewportWidth > 768) {
    maxWidth = Math.min(viewportWidth * 0.7, 1200);
  }
  
  // Calculate dimensions maintaining aspect ratio
  const width = Math.min(originalWidth, maxWidth);
  const height = Math.round(width / aspectRatio);
  
  return { width, height };
};

/**
 * Get appropriate image size based on device
 * @param deviceWidth Device width
 * @returns Image size to use
 */
export const getImageSizeForDevice = (deviceWidth: number): number => {
  if (deviceWidth < 640) return 640;
  if (deviceWidth < 750) return 750;
  if (deviceWidth < 828) return 828;
  if (deviceWidth < 1080) return 1080;
  if (deviceWidth < 1200) return 1200;
  if (deviceWidth < 1920) return 1920;
  return 2048;
};

/**
 * Generate srcSet for responsive images
 * @param basePath Base path of the image
 * @param sizes Array of sizes to generate
 * @returns srcSet string
 */
export const generateSrcSet = (basePath: string, sizes: number[]): string => {
  return sizes
    .map(size => `${basePath}?w=${size} ${size}w`)
    .join(', ');
};

/**
 * Determine if an image should be lazy loaded
 * @param index Position in the list of images
 * @param isVisible Whether the image is in the viewport
 * @returns Boolean indicating if image should be lazy loaded
 */
export const shouldLazyLoad = (index: number, isVisible: boolean): boolean => {
  // Always load the first few images immediately
  if (index < 3) return false;
  
  // If the image is visible in the viewport, load it
  if (isVisible) return false;
  
  // Otherwise, lazy load
  return true;
};
