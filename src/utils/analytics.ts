export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: number;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.loadEvents();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private loadEvents(): void {
    try {
      const stored = localStorage.getItem('analytics_events');
      if (stored) {
        this.events = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load analytics events', e);
    }
  }

  private saveEvents(): void {
    try {
      localStorage.setItem('analytics_events', JSON.stringify(this.events));
    } catch (e) {
      console.error('Failed to save analytics events', e);
    }
  }

  track(event: string, category: string, action: string, label?: string, value?: number): void {
    const analyticsEvent: AnalyticsEvent = {
      event,
      category,
      action,
      label,
      value,
      timestamp: Date.now(),
    };

    this.events.push(analyticsEvent);
    this.saveEvents();

    console.log('[Analytics]', analyticsEvent);
  }

  trackEvent(event: string, category: string, action: string, label?: string, value?: number): void {
    this.track(event, category, action, label, value);
  }

  trackButtonClick(buttonName: string, location: string): void {
    this.track('button_click', 'engagement', 'click', `${buttonName} (${location})`);
  }

  trackFormSubmit(formName: string): void {
    this.track('form_submit', 'conversion', 'submit', formName);
  }

  trackSectionView(sectionName: string): void {
    this.track('section_view', 'engagement', 'view', sectionName);
  }

  trackScroll(percentage: number): void {
    this.track('scroll', 'engagement', 'scroll', `${percentage}%`, percentage);
  }

  trackLinkClick(linkName: string, url: string): void {
    this.track('link_click', 'engagement', 'click', `${linkName} → ${url}`);
  }

  logEvent(eventName: string, label?: string): void {
    this.track(eventName, 'custom', 'event', label);
  }

  getEvents(): AnalyticsEvent[] {
    return this.events;
  }

  getSessionId(): string {
    return this.sessionId;
  }

  getConversionRate(): number {
    const formSubmits = this.events.filter(e => e.category === 'conversion').length;
    const totalEvents = this.events.length;
    return totalEvents > 0 ? (formSubmits / totalEvents) * 100 : 0;
  }

  getEngagementStats() {
    const clicks = this.events.filter(e => e.action === 'click').length;
    const views = this.events.filter(e => e.action === 'view').length;
    const submits = this.events.filter(e => e.action === 'submit').length;
    const scrollEvents = this.events.filter(e => e.event === 'scroll');
    const maxScroll = scrollEvents.length > 0 
      ? Math.max(...scrollEvents.map(e => e.value || 0))
      : 0;

    return {
      totalEvents: this.events.length,
      clicks,
      views,
      submits,
      maxScroll,
      conversionRate: this.getConversionRate(),
    };
  }

  clearEvents(): void {
    this.events = [];
    localStorage.removeItem('analytics_events');
  }
}

export const analytics = new Analytics();