
import { toast } from "sonner";

// Simple cache for images
const imageCache: Record<string, string> = {};

/**
 * Fetches an image for a given Arabic word
 * In a real implementation, this would connect to your image generation API
 */
export const fetchWordImage = async (word: string): Promise<string | null> => {
  // Check cache first
  if (imageCache[word]) {
    console.log(`Using cached image for "${word}"`);
    return imageCache[word];
  }

  try {
    // In a real implementation, this would be a call to your backend service
    // that connects with the image generation API
    
    // For now, we'll use a placeholder image service
    // This is just for demonstration - in a real app, replace with your actual API
    const imageUrl = `https://source.unsplash.com/100x100/?${encodeURIComponent(word)}`;
    
    // In a real implementation, we would verify the image is valid
    // For example by loading it in an image object
    const verified = await verifyImage(imageUrl);
    
    if (verified) {
      // Cache the image URL
      imageCache[word] = imageUrl;
      return imageUrl;
    } else {
      console.error("Could not verify image");
      return null;
    }
  } catch (error) {
    console.error("Error fetching word image:", error);
    toast.error("حدث خطأ أثناء جلب الصورة");
    return null;
  }
};

/**
 * Verify that an image URL is valid
 */
const verifyImage = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};
