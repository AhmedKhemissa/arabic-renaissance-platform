
/**
 * Applies a staggered animation to elements matching the selector
 * @param selector CSS selector for the elements to animate
 * @param staggerMs Milliseconds between each element's animation
 * @param initialDelayMs Initial delay before starting animations
 */
export const staggeredAnimation = (
  selector: string,
  staggerMs: number = 100,
  initialDelayMs: number = 0
): void => {
  // This should run in the browser, not during React rendering
  setTimeout(() => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
      const element = el as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(10px)';
      element.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
      element.style.animationFillMode = 'forwards';
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, initialDelayMs + (index * staggerMs));
    });
  }, 0);
};
