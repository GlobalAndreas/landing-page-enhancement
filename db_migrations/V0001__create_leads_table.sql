-- Создание таблицы для хранения лидов
CREATE TABLE IF NOT EXISTS leads (
  id VARCHAR(100) PRIMARY KEY,
  timestamp BIGINT NOT NULL,
  date VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  contact VARCHAR(255) NOT NULL,
  niche VARCHAR(500) NOT NULL,
  goal TEXT NOT NULL,
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  utm_content VARCHAR(255),
  utm_term VARCHAR(255),
  page_depth INTEGER NOT NULL,
  time_on_page INTEGER NOT NULL,
  device VARCHAR(50) NOT NULL,
  referrer TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индекс для быстрой сортировки по дате
CREATE INDEX idx_leads_timestamp ON leads(timestamp DESC);

-- Индекс для фильтрации по устройству
CREATE INDEX idx_leads_device ON leads(device);

-- Индекс для фильтрации по UTM меткам
CREATE INDEX idx_leads_utm_source ON leads(utm_source);