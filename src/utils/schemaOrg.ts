export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Андрей Дильман",
  "url": "https://dilman.pro",
  "logo": "https://cdn.poehali.dev/files/4282259e-6f12-4a46-9573-6f5a0b5d5880.jpg",
  "description": "Разработка автоворонок, Telegram-ботов, чат-ботов и настройка контекстного трафика под ключ. Полная автоматизация бизнес-процессов: от лидогенерации до продажи через автоворонки, чат-ботов и таргетированную рекламу.",
  "founder": {
    "@type": "Person",
    "name": "Андрей Дильман",
    "jobTitle": "Эксперт по автоматизации бизнеса через автоворонки, Telegram-ботов и чат-ботов",
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
  "jobTitle": "Эксперт по автоматизации бизнеса через автоворонки, Telegram-ботов, чат-ботов и контекстную рекламу",
  "description": "13 лет опыта в digital-маркетинге и автоматизации бизнес-процессов. Специализация: разработка автоворонок, Telegram-ботов, чат-ботов, настройка контекстной и таргетированной рекламы, интеграция CRM-систем.",
  "knowsAbout": [
    "Разработка автоворонок",
    "Создание Telegram-ботов",
    "Разработка чат-ботов",
    "Настройка контекстного трафика",
    "Таргетированная реклама",
    "Автоматизация бизнес-процессов",
    "Digital-маркетинг и лидогенерация",
    "Интеграция CRM-систем",
    "Яндекс Директ и Google Ads",
    "Автоворонки продаж"
  ]
});

export const getServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Автоматизация бизнеса через автоворонки и чат-боты",
  "provider": {
    "@type": "Person",
    "name": "Андрей Дильман"
  },
  "areaServed": "RU",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Услуги по автоматизации бизнеса",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Разработка Telegram-ботов, чат-ботов и автоворонок",
          "description": "Создание Telegram-ботов и чат-ботов под ключ для автоматизации коммуникации с клиентами, прогрева аудитории через автоворонки и увеличения конверсии в 3-5 раз. Интеграция Telegram-ботов с CRM, платёжными системами, автоматизация обработки заявок."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Настройка контекстного и таргетированного трафика под ключ",
          "description": "Полный цикл настройки контекстной рекламы (Яндекс Директ, Google Ads) и таргетированной рекламы (ВКонтакте, Telegram Ads). Интеграция трафика с автоворонками и Telegram-ботами. Стратегия, таргетинг, оптимизация, масштабирование."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Интеграция CRM-систем с чат-ботами и автоворонками",
          "description": "Интеграция Telegram-ботов и чат-ботов с CRM-системами (АмоCRM, Bitrix24). Настройка сквозной аналитики для автоворонок, автоматизация отчётности и обработки лидов через чат-ботов."
        }
      }
    ]
  }
});

export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Андрей Дильман — Telegram-боты, автоворонки и трафик",
  "image": "https://cdn.poehali.dev/files/791797f1-17b2-4b45-a837-d1fe8f9ae82c.png",
  "@id": "https://dilman.pro",
  "url": "https://dilman.pro",
  "telephone": "+7 (XXX) XXX-XX-XX",
  "priceRange": "30000-120000 RUB",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "RU",
    "addressRegion": "Москва"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 55.7558,
    "longitude": 37.6173
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://t.me/yourtelegram"
  ]
});

export const getBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Главная",
      "item": "https://dilman.pro/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Услуги",
      "item": "https://dilman.pro/#services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Отзывы",
      "item": "https://dilman.pro/#testimonials"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Консультация",
      "item": "https://dilman.pro/#consultation"
    }
  ]
});