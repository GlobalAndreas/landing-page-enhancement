interface UTMParams {
  utmSource: string;
  utmContent: string;
  utmCampaign: string;
  utmMedium: string;
  utmTerm: string;
}

const UTM_STORAGE_KEY = 'landing_utm_params';
const UTM_EXPIRY_DAYS = 30;

export const parseAndSaveUTM = (): void => {
  const urlParams = new URLSearchParams(window.location.search);
  
  const hasUTM = urlParams.has('utm_source') || 
                 urlParams.has('utm_campaign') || 
                 urlParams.has('utm_medium') || 
                 urlParams.has('utm_content') || 
                 urlParams.has('utm_term');
  
  if (hasUTM) {
    const utmData = {
      utmSource: urlParams.get('utm_source') || '',
      utmContent: urlParams.get('utm_content') || '',
      utmCampaign: urlParams.get('utm_campaign') || '',
      utmMedium: urlParams.get('utm_medium') || '',
      utmTerm: urlParams.get('utm_term') || '',
      timestamp: Date.now(),
    };
    
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmData));
  }
};

export const getUTMParams = (): UTMParams => {
  try {
    const storedData = localStorage.getItem(UTM_STORAGE_KEY);
    
    if (storedData) {
      const parsed = JSON.parse(storedData);
      const expiryTime = UTM_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
      
      if (Date.now() - parsed.timestamp < expiryTime) {
        return {
          utmSource: parsed.utmSource || '',
          utmContent: parsed.utmContent || '',
          utmCampaign: parsed.utmCampaign || '',
          utmMedium: parsed.utmMedium || '',
          utmTerm: parsed.utmTerm || '',
        };
      } else {
        localStorage.removeItem(UTM_STORAGE_KEY);
      }
    }
  } catch (error) {
    console.error('Error reading UTM from localStorage:', error);
  }
  
  return {
    utmSource: '',
    utmContent: '',
    utmCampaign: '',
    utmMedium: '',
    utmTerm: '',
  };
};

export const clearUTMParams = (): void => {
  localStorage.removeItem(UTM_STORAGE_KEY);
};

export const getReferrer = (): string => {
  return document.referrer || '';
};