// Fetch analytics data from Vercel Analytics API
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = process.env.VERCEL_ANALYTICS_TOKEN;
    const projectId = process.env.VERCEL_PROJECT_ID;
    const teamId = process.env.VERCEL_TEAM_ID;

    if (!token) {
      console.error('VERCEL_ANALYTICS_TOKEN not configured');
      return res.status(500).json({ error: 'Analytics token not configured' });
    }

    if (!projectId) {
      console.error('VERCEL_PROJECT_ID not configured');
      return res.status(500).json({ error: 'Project ID not configured' });
    }

    // Build the URL
    const baseUrl = teamId
      ? `https://api.vercel.com/v1/analytics?projectId=${projectId}&teamId=${teamId}`
      : `https://api.vercel.com/v1/analytics?projectId=${projectId}`;

    // Fetch analytics from Vercel API
    const response = await fetch(baseUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Vercel API error:', response.status, errorText);
      return res.status(response.status).json({
        error: 'Failed to fetch analytics from Vercel',
        details: errorText
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (e) {
    console.error('Error fetching Vercel analytics:', e);
    return res.status(500).json({ error: e.message });
  }
}
