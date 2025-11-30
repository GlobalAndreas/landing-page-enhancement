export const PIXEL_CONFIG = {
  META_PIXEL_ID: import.meta.env.VITE_META_PIXEL_ID || '',
  VK_PIXEL_ID: import.meta.env.VITE_VK_PIXEL_ID || '',
  GA4_MEASUREMENT_ID: import.meta.env.VITE_GA4_MEASUREMENT_ID || '',
  YANDEX_METRIKA_ID: 101026698,
};

export const isPixelEnabled = (pixelType: 'meta' | 'vk' | 'ga4' | 'yandex'): boolean => {
  switch (pixelType) {
    case 'meta':
      return !!PIXEL_CONFIG.META_PIXEL_ID;
    case 'vk':
      return !!PIXEL_CONFIG.VK_PIXEL_ID;
    case 'ga4':
      return !!PIXEL_CONFIG.GA4_MEASUREMENT_ID;
    case 'yandex':
      return !!PIXEL_CONFIG.YANDEX_METRIKA_ID;
    default:
      return false;
  }
};