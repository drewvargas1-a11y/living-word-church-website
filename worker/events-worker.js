export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Content-Type': 'application/json',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url      = new URL(request.url);
    const table    = url.pathname === '/highlights' ? env.HIGHLIGHTS_TABLE_ID : env.TABLE_ID;
    const params   = url.searchParams.toString();
    const airtableUrl = `https://api.airtable.com/v0/${env.BASE_ID}/${table}${params ? '?' + params : ''}`;

    const res  = await fetch(airtableUrl, {
      headers: { Authorization: `Bearer ${env.AIRTABLE_TOKEN}` },
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), { headers: corsHeaders });
  },
};
