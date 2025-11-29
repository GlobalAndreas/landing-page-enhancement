export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Андрей Дильман",
  "url": "https://dilman.pro",
  "logo": "https://cdn.poehali.dev/files/4282259e-6f12-4a46-9573-6f5a0b5d5880.jpg",
  "description": "Разработка автоворонок, Telegram-ботов и настройка трафика под ключ. Автоматизация бизнеса.",
  "founder": {
    "@type": "Person",
    "name": "Андрей Дильман",
    "jobTitle": "Эксперт по автоматизации бизнеса",
    "image": "https://cdn.poehali.dev/files/791797f1-17b2-4b45-a837-d1fe8f9ae82c.png"
  },
  "sameAs": [
    "https://t.me/yourtelegram"
  ]
});

export const getPersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Андрей Дильман",
  "url": "https://dilman.pro",
  "image": "https://cdn.poehali.dev/files/791797f1-17b2-4b45-a837-d1fe8f9ae82c.png",
  "jobTitle": "Эксперт по автоматизации бизнеса, автоворонкам и Telegram-ботам",
  "description": "13 лет опыта в digital-маркетинге. Специализация: автоворонки, чат-боты, трафик под ключ.",
  "knowsAbout": [
    "Автоворонки",
    "Telegram-боты",
    "Чат-боты",
    "Трафик",
    "Автоматизация бизнеса",
    "Digital-маркетинг"
  ]
});

export const getServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Автоматизация бизнеса",
  "provider": {
    "@type": "Person",
    "name": "Андрей Дильман"
  },
  "areaServed": "RU",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Услуги по автоматизации",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Разработка Telegram-ботов и автоворонок",
          "description": "Создание чат-ботов для автоматизации коммуникации с клиентами, прогрева аудитории и увеличения конверсии."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Настройка трафика под ключ",
          "description": "Полный цикл настройки рекламных кампаний: стратегия, таргетинг, оптимизация, масштабирование."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "CRM и аналитика",
          "description": "Интеграция систем аналитики, настройка сквозной аналитики и автоматизация отчётности."
        }
      }
    ]
  }
});
