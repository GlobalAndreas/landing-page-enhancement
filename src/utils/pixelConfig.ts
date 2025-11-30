export const PIXEL_CONFIG = {
  META_PIXEL_ID: import.meta.env.VITE_META_PIXEL_ID || '',
  VK_PIXEL_ID: import.meta.env.VITE_VK_PIXEL_ID || '',
  YANDEX_METRIKA_ID: 101026698,
};

export const isPixelEnabled = (pixelType: 'meta' | 'vk' | 'yandex'): boolean => {
  switch (pixelType) {
    case 'meta':
      return !!PIXEL_CONFIG.META_PIXEL_ID;
    case 'vk':
      return !!PIXEL_CONFIG.VK_PIXEL_ID;
    case 'yandex':
      return !!PIXEL_CONFIG.YANDEX_METRIKA_ID;
    default:
      return false;
  }
};
