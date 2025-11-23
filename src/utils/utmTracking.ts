interface UTMParams {
  utmSource: string;
  utmContent: string;
  utmCampaign: string;
}

export const getUTMParams = (): UTMParams => {
  const urlParams = new URLSearchParams(window.location.search);
  
  return {
    utmSource: urlParams.get('utm_source') || '',
    utmContent: urlParams.get('utm_content') || '',
    utmCampaign: urlParams.get('utm_campaign') || '',
  };
};

export const getReferrer = (): string => {
  return document.referrer || '';
};
