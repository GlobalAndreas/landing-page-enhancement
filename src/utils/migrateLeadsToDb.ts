import func2url from '@/../backend/func2url.json';

export const migrateLocalLeadsToDatabase = async (): Promise<void> => {
  try {
    const localLeads = localStorage.getItem('landing_leads');
    if (!localLeads) {
      console.log('No local leads to migrate');
      return;
    }

    const leads = JSON.parse(localLeads);
    console.log(`Migrating ${leads.length} leads to database...`);

    for (const lead of leads) {
      const leadData = {
        id: lead.id,
        timestamp: lead.timestamp,
        date: lead.date,
        name: lead.name,
        contact: lead.contact,
        niche: lead.niche || '',
        goal: lead.goal || '',
        utm_source: lead.utmSource || '',
        utm_medium: lead.utmMedium || '',
        utm_campaign: lead.utmCampaign || '',
        utm_content: lead.utmContent || '',
        utm_term: lead.utmTerm || '',
        page_depth: lead.pageDepth || 0,
        time_on_page: lead.timeOnPage || 0,
        device: lead.device || 'desktop',
        referrer: lead.referrer || '',
      };

      await fetch(func2url['save-lead'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });
    }

    console.log('Migration completed successfully');
    localStorage.removeItem('landing_leads');
    console.log('Local leads removed from localStorage');
  } catch (error) {
    console.error('Failed to migrate leads:', error);
  }
};
