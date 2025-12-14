-- Create leads table for storing all consultation requests
CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    timestamp BIGINT NOT NULL,
    date TEXT NOT NULL,
    name TEXT NOT NULL,
    contact TEXT NOT NULL,
    niche TEXT,
    goal TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,
    page_depth INTEGER,
    time_on_page INTEGER,
    device TEXT,
    referrer TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries by timestamp
CREATE INDEX IF NOT EXISTS idx_leads_timestamp ON leads(timestamp DESC);
