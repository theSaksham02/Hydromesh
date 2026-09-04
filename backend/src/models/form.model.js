const { query, useRest } = require('../config/database');
const { getSupabase } = require('../config/supabase');

const FormSubmission = {
  // 1. Newsletter / Mailing List Subscription
  async subscribeNewsletter({ firstName, lastName, email }) {
    if (useRest) {
      const sb = getSupabase();
      const { data, error } = await sb
        .from('newsletter_subscribers')
        .insert({
          first_name: firstName,
          last_name: lastName,
          email: email.toLowerCase().trim(),
          created_at: new Date().toISOString(),
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    }

    const result = await query(
      `INSERT INTO newsletter_subscribers (first_name, last_name, email, created_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING *`,
      [firstName, lastName, email.toLowerCase().trim()]
    );
    return result.rows[0];
  },

  // 2. Pilot Deployment Application
  async submitPilot({ agency, city, email, notes }) {
    if (useRest) {
      const sb = getSupabase();
      const { data, error } = await sb
        .from('pilot_applications')
        .insert({
          agency: agency.trim(),
          city: city.trim(),
          email: email.toLowerCase().trim(),
          notes: notes ? notes.trim() : '',
          status: 'pending',
          created_at: new Date().toISOString(),
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    }

    const result = await query(
      `INSERT INTO pilot_applications (agency, city, email, notes, status, created_at)
       VALUES ($1, $2, $3, $4, 'pending', NOW())
       RETURNING *`,
      [agency.trim(), city.trim(), email.toLowerCase().trim(), notes ? notes.trim() : '']
    );
    return result.rows[0];
  },

  // 3. Contact Form Direct Message
  async submitContact({ name, email, message }) {
    if (useRest) {
      const sb = getSupabase();
      const { data, error } = await sb
        .from('contact_messages')
        .insert({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          message: message.trim(),
          status: 'unread',
          created_at: new Date().toISOString(),
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    }

    const result = await query(
      `INSERT INTO contact_messages (name, email, message, status, created_at)
       VALUES ($1, $2, $3, 'unread', NOW())
       RETURNING *`,
      [name.trim(), email.toLowerCase().trim(), message.trim()]
    );
    return result.rows[0];
  },

  // 4. Aggregate counts / stats
  async getStats() {
    if (useRest) {
      const sb = getSupabase();
      const [newsRes, pilotRes, contactRes] = await Promise.all([
        sb.from('newsletter_subscribers').select('id', { count: 'exact', head: true }),
        sb.from('pilot_applications').select('id', { count: 'exact', head: true }),
        sb.from('contact_messages').select('id', { count: 'exact', head: true }),
      ]);
      return {
        newsletterSubscribers: newsRes.count || 0,
        pilotApplications: pilotRes.count || 0,
        contactMessages: contactRes.count || 0,
      };
    }

    const [newsRes, pilotRes, contactRes] = await Promise.all([
      query('SELECT COUNT(*) FROM newsletter_subscribers'),
      query('SELECT COUNT(*) FROM pilot_applications'),
      query('SELECT COUNT(*) FROM contact_messages'),
    ]);
    return {
      newsletterSubscribers: parseInt(newsRes.rows[0].count, 10),
      pilotApplications: parseInt(pilotRes.rows[0].count, 10),
      contactMessages: parseInt(contactRes.rows[0].count, 10),
    };
  },
};

module.exports = FormSubmission;
