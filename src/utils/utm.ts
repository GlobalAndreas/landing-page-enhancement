export interface UTMParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

export class UTMTracker {
  private readonly STORAGE_KEY = 'utm_params';

  constructor() {
    this.captureUTMFromURL();
  }

  private captureUTMFromURL(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams: UTMParams = {};

    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    
    utmKeys.forEach(key => {
      const value = urlParams.get(key);
      if (value) {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        utmParams[camelKey as keyof UTMParams] = value;
      }
    });

    if (Object.keys(utmParams).length > 0) {
      this.saveUTMParams(utmParams);
    }
  }

  private saveUTMParams(params: UTMParams): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(params));
    } catch (e) {
      console.error('Failed to save UTM params', e);
    }
  }

  getUTMParams(): UTMParams {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      console.error('Failed to load UTM params', e);
      return {};
    }
  }

  clearUTMParams(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export const utmTracker = new UTMTracker();
