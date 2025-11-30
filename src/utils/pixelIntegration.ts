declare global {
  interface Window {
    dataLayer: any[];
    fbq?: (...args: any[]) => void;
    _fbq?: (...args: any[]) => void;
    ym?: (...args: any[]) => void;
    VK?: {
      Retargeting: {
        Init: (pixelId: string) => void;
        Hit: () => void;
        Event: (eventName: string) => void;
        ProductEvent: (price: number, event: string, params?: any) => void;
      };
    };
  }
}

export type PixelEvent = 
  | 'PageView'
  | 'Lead'
  | 'Scroll75'
  | 'ExitIntent'
  | 'OpenBot'
  | 'ConsultationOpen'
  | 'WarmupClick'
  | 'SubmitForm';

interface PixelEventData {
  event: PixelEvent;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

class PixelIntegration {
  private metaPixelId: string | null = null;
  private vkPixelId: string | null = null;
  private yandexMetrikaId: number | null = null;
  private initialized = false;

  constructor() {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
    }
  }

  init(config: {
    metaPixelId?: string;
    vkPixelId?: string;
    yandexMetrikaId?: number;
  }) {
    this.metaPixelId = config.metaPixelId || null;
    this.vkPixelId = config.vkPixelId || null;
    this.yandexMetrikaId = config.yandexMetrikaId || 101026698;
    this.initialized = true;

    if (this.metaPixelId) {
      this.initMetaPixel();
    }

    if (this.vkPixelId) {
      this.initVKPixel();
    }
  }

  private initMetaPixel() {
    if (typeof window === 'undefined' || !this.metaPixelId) return;

    if (!window.fbq) {
      (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = true;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    }

    if (window.fbq && this.metaPixelId) {
      window.fbq('init', this.metaPixelId);
      window.fbq('track', 'PageView');
    }
  }

  private initVKPixel() {
    if (typeof window === 'undefined' || !this.vkPixelId) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://vk.com/js/api/openapi.js?169';
    script.onload = () => {
      if (window.VK && this.vkPixelId) {
        window.VK.Retargeting.Init(this.vkPixelId);
        window.VK.Retargeting.Hit();
      }
    };
    document.head.appendChild(script);
  }

  trackEvent(eventData: PixelEventData) {
    if (!this.initialized) {
      console.warn('[PixelIntegration] Not initialized. Call init() first.');
      return;
    }

    const { event, metadata = {} } = eventData;

    this.pushToDataLayer(eventData);
    this.trackMetaPixel(event, metadata);
    this.trackVKPixel(event, metadata);
    this.trackYandexMetrika(event, metadata);
  }

  private pushToDataLayer(eventData: PixelEventData) {
    if (typeof window === 'undefined') return;

    window.dataLayer.push({
      event: eventData.event,
      eventCategory: eventData.category,
      eventAction: eventData.action,
      eventLabel: eventData.label,
      eventValue: eventData.value,
      timestamp: Date.now(),
      ...eventData.metadata,
    });
  }

  private trackMetaPixel(event: PixelEvent, metadata: Record<string, any>) {
    if (!window.fbq || !this.metaPixelId) return;

    const eventMap: Record<PixelEvent, string> = {
      PageView: 'PageView',
      Lead: 'Lead',
      Scroll75: 'ViewContent',
      ExitIntent: 'ViewContent',
      OpenBot: 'Contact',
      ConsultationOpen: 'InitiateCheckout',
      WarmupClick: 'ViewContent',
      SubmitForm: 'Lead',
    };

    const fbEvent = eventMap[event] || 'CustomEvent';
    
    try {
      window.fbq('track', fbEvent, metadata);
    } catch (e) {
      console.error('[Meta Pixel] Error tracking event:', e);
    }
  }

  private trackVKPixel(event: PixelEvent, metadata: Record<string, any>) {
    if (!window.VK || !this.vkPixelId) return;

    const eventMap: Record<PixelEvent, string> = {
      PageView: 'page_view',
      Lead: 'lead',
      Scroll75: 'view_content',
      ExitIntent: 'view_content',
      OpenBot: 'contact',
      ConsultationOpen: 'add_to_cart',
      WarmupClick: 'view_content',
      SubmitForm: 'lead',
    };

    const vkEvent = eventMap[event];

    try {
      if (event === 'SubmitForm' && metadata.value) {
        window.VK.Retargeting.ProductEvent(metadata.value, 'lead');
      } else {
        window.VK.Retargeting.Event(vkEvent);
      }
    } catch (e) {
      console.error('[VK Pixel] Error tracking event:', e);
    }
  }

  private trackYandexMetrika(event: PixelEvent, metadata: Record<string, any>) {
    if (!window.ym || !this.yandexMetrikaId) return;

    const goalMap: Record<PixelEvent, string> = {
      PageView: 'page_view',
      Lead: 'lead',
      Scroll75: 'scroll_75',
      ExitIntent: 'exit_intent',
      OpenBot: 'open_bot',
      ConsultationOpen: 'consultation_open',
      WarmupClick: 'warmup_click',
      SubmitForm: 'submit_form',
    };

    const ymGoal = goalMap[event];

    try {
      window.ym(this.yandexMetrikaId, 'reachGoal', ymGoal, metadata);
    } catch (e) {
      console.error('[Yandex Metrika] Error tracking event:', e);
    }
  }

  trackPageView() {
    this.trackEvent({
      event: 'PageView',
      category: 'engagement',
      action: 'page_view',
    });
  }

  trackLead(metadata?: Record<string, any>) {
    this.trackEvent({
      event: 'Lead',
      category: 'conversion',
      action: 'lead',
      metadata,
    });
  }

  trackScroll75() {
    this.trackEvent({
      event: 'Scroll75',
      category: 'engagement',
      action: 'scroll',
      label: '75%',
      value: 75,
    });
  }

  trackExitIntent() {
    this.trackEvent({
      event: 'ExitIntent',
      category: 'engagement',
      action: 'exit_intent',
    });
  }

  trackOpenBot() {
    this.trackEvent({
      event: 'OpenBot',
      category: 'engagement',
      action: 'open_bot',
    });
  }

  trackConsultationOpen() {
    this.trackEvent({
      event: 'ConsultationOpen',
      category: 'engagement',
      action: 'consultation_open',
    });
  }

  trackWarmupClick() {
    this.trackEvent({
      event: 'WarmupClick',
      category: 'engagement',
      action: 'warmup_click',
    });
  }

  trackSubmitForm(formData?: Record<string, any>) {
    this.trackEvent({
      event: 'SubmitForm',
      category: 'conversion',
      action: 'submit_form',
      metadata: formData,
    });
  }
}

export const pixelIntegration = new PixelIntegration();
