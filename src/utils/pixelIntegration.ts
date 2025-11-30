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
    gtag?: (...args: any[]) => void;
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
  private ga4MeasurementId: string | null = null;
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
    ga4MeasurementId?: string;
  }) {
    this.metaPixelId = config.metaPixelId || null;
    this.vkPixelId = config.vkPixelId || null;
    this.yandexMetrikaId = config.yandexMetrikaId || 101026698;
    this.ga4MeasurementId = config.ga4MeasurementId || null;
    this.initialized = true;

    if (this.metaPixelId) {
      this.initMetaPixel();
    }

    if (this.vkPixelId) {
      this.initVKPixel();
    }

    if (this.ga4MeasurementId) {
      this.initGA4();
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

  private initGA4() {
    if (typeof window === 'undefined' || !this.ga4MeasurementId) return;

    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${this.ga4MeasurementId}`;
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    const gtag = (...args: any[]) => {
      window.dataLayer.push(args);
    };
    window.gtag = gtag as any;
    gtag('js', new Date());
    gtag('config', this.ga4MeasurementId, {
      send_page_view: true,
    });
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
    this.trackGA4(event, metadata);
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

  private getUTMParams(): Record<string, string> {
    try {
      const stored = localStorage.getItem('utm_params');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  private trackGA4(event: PixelEvent, metadata: Record<string, any>) {
    if (!window.gtag || !this.ga4MeasurementId) return;

    const utmParams = this.getUTMParams();

    const eventMap: Record<PixelEvent, string> = {
      PageView: 'page_view',
      Lead: 'generate_lead',
      Scroll75: 'engaged_scroll',
      ExitIntent: 'exit_intent',
      OpenBot: 'begin_checkout',
      ConsultationOpen: 'view_item',
      WarmupClick: 'select_content',
      SubmitForm: 'generate_lead',
    };

    const ga4Event = eventMap[event];

    try {
      if (event === 'PageView') {
        window.gtag('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href,
          page_path: window.location.pathname,
          ...utmParams,
          ...metadata,
        });
      } else if (event === 'Scroll75') {
        window.gtag('event', 'engaged_scroll', {
          engagement_type: 'scroll',
          scroll_depth: 75,
          page_path: window.location.pathname,
          ...utmParams,
        });
      } else if (event === 'ConsultationOpen') {
        window.gtag('event', 'view_item', {
          item_category: 'consultation_form',
          item_name: 'consultation_request',
          funnel_step: 'form_view',
          ...utmParams,
        });
      } else if (event === 'OpenBot') {
        window.gtag('event', 'begin_checkout', {
          item_category: 'telegram_bot',
          lead_type: 'bot',
          funnel_step: 'bot_open',
          ...utmParams,
        });
      } else if (event === 'SubmitForm') {
        window.gtag('event', 'generate_lead', {
          lead_type: metadata.lead_type || 'consultation',
          form_name: metadata.form_name || 'consultation_form',
          value: metadata.value || 0,
          currency: 'RUB',
          ...utmParams,
          ...metadata,
        });
      } else if (event === 'WarmupClick') {
        window.gtag('event', 'select_content', {
          content_type: 'warmup_preview',
          item_id: 'warmup_click',
          ...utmParams,
        });
      } else {
        window.gtag('event', ga4Event, {
          event_category: metadata.category || 'engagement',
          ...utmParams,
          ...metadata,
        });
      }
    } catch (e) {
      console.error('[GA4] Error tracking event:', e);
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
      metadata: {
        lead_type: 'consultation',
        form_name: 'consultation_form',
        ...formData,
      },
    });
  }
}

export const pixelIntegration = new PixelIntegration();