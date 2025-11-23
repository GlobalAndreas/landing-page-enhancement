export class PageTracker {
  private startTime: number;
  private maxScrollDepth: number = 0;

  constructor() {
    this.startTime = Date.now();
    this.trackScrollDepth();
  }

  private trackScrollDepth(): void {
    const updateScrollDepth = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = Math.round((scrollTop + windowHeight) / documentHeight * 100);
      
      if (scrollPercentage > this.maxScrollDepth) {
        this.maxScrollDepth = Math.min(scrollPercentage, 100);
      }
    };

    window.addEventListener('scroll', updateScrollDepth);
    updateScrollDepth();
  }

  getTimeOnPage(): number {
    return Math.round((Date.now() - this.startTime) / 1000);
  }

  getMaxScrollDepth(): number {
    return this.maxScrollDepth;
  }

  getDevice(): string {
    return /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
  }

  getReferrer(): string {
    return document.referrer || 'direct';
  }
}

export const pageTracker = new PageTracker();
