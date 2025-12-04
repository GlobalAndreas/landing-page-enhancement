import { getDeviceType } from '@/utils/deviceDetection';
import { getUTMParams, getReferrer } from '@/utils/utmTracking';
import { saveLead } from './leadsStorage';

interface FormData {
  name: string;
  contact: string;
  niche: string;
  goal: string;
}

interface TrackingData {
  timeOnPage: number;
  pageDepth: number;
}

export const sendTelegramNotification = async (
  formData: FormData,
  trackingData: TrackingData
): Promise<boolean> => {
  try {
    const utmParams = getUTMParams();
    const device = getDeviceType();
    const referrer = getReferrer();

    const payload = {
      name: formData.name,
      contact: formData.contact,
      niche: formData.niche,
      goal: formData.goal,
      utmSource: utmParams.utmSource,
      utmContent: utmParams.utmContent,
      utmCampaign: utmParams.utmCampaign,
      utmMedium: utmParams.utmMedium,
      utmTerm: utmParams.utmTerm,
      pageDepth: trackingData.pageDepth,
      timeOnPage: trackingData.timeOnPage,
      device: device,
      referrer: referrer,
    };

    saveLead(payload);

    const response = await fetch('https://functions.poehali.dev/2fa68642-9eb4-4f89-9382-a2e81344756a', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to send Telegram notification:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return false;
  }
};