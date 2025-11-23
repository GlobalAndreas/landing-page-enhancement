import { getDeviceType } from '@/utils/deviceDetection';
import { getUTMParams, getReferrer } from '@/utils/utmTracking';

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

    const response = await fetch('/tg_notify.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Failed to send Telegram notification:', response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return false;
  }
};