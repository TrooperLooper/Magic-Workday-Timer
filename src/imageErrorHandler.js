/**
 * Image Error Handler
 * Graceful fallback for missing SVG files
 */

// Placeholder SVG for fallback (small circle)
const FALLBACK_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'%3E%3Ccircle cx='9' cy='9' r='8' fill='%23ccc' /%3E%3C/svg%3E";

/**
 * Handles image load errors with graceful fallback
 * @param {Event} event - Image error event
 */
export function handleImageError(event) {
  console.warn(`Failed to load image: ${event.target.src}`);
  event.target.src = FALLBACK_SVG;
  event.target.style.opacity = "0.5"; // Visual indicator that image failed
}

/**
 * Creates an img element with error handling
 * @param {string} src - Image source path
 * @param {string} alt - Alt text
 * @param {object} style - Inline styles
 * @returns {object} Props for img element
 */
export function createSafeImageProps(src, alt, style = {}) {
  return {
    src,
    alt,
    style,
    onError: handleImageError,
    onLoad: (event) => {
      // Reset opacity on successful load
      event.target.style.opacity = "1";
    },
  };
}
