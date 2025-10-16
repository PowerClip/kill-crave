// Campaign management utilities

export interface Campaign {
  slug: string;
  name: string;
  destination: string;
  description: string;
  createdAt: string;
  scans: number;
}

export interface CreateCampaignPayload {
  name: string;
  destination?: string;
  description?: string;
}

// Get authentication password from localStorage
function getAuthPassword(): string | null {
  if (typeof window === 'undefined') return null;

  // Try to get password from session storage
  const password = sessionStorage.getItem('analytics_password');
  return password;
}

// Fetch all campaigns
export async function fetchCampaigns(password?: string): Promise<Campaign[]> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const authPassword = password || getAuthPassword();
    if (authPassword) {
      headers['Authorization'] = `Bearer ${authPassword}`;
    }

    const response = await fetch('/api/campaigns/list', { headers });

    if (!response.ok) {
      throw new Error('Failed to fetch campaigns');
    }

    const data = await response.json();
    return data.campaigns || [];
  } catch (e) {
    console.error('Failed to fetch campaigns:', e);
    return [];
  }
}

// Create a new campaign
export async function createCampaign(
  payload: CreateCampaignPayload,
  password?: string
): Promise<Campaign | null> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const authPassword = password || getAuthPassword();
    if (authPassword) {
      headers['Authorization'] = `Bearer ${authPassword}`;
    }

    const response = await fetch('/api/campaigns/create', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create campaign');
    }

    const data = await response.json();
    return data.campaign;
  } catch (e) {
    console.error('Failed to create campaign:', e);
    throw e;
  }
}

// Delete a campaign
export async function deleteCampaign(
  slug: string,
  password?: string
): Promise<boolean> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const authPassword = password || getAuthPassword();
    if (authPassword) {
      headers['Authorization'] = `Bearer ${authPassword}`;
    }

    const response = await fetch('/api/campaigns/delete', {
      method: 'DELETE',
      headers,
      body: JSON.stringify({ slug }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete campaign');
    }

    return true;
  } catch (e) {
    console.error('Failed to delete campaign:', e);
    return false;
  }
}

// Generate QR code URL for a campaign
export function generateQRCodeURL(slug: string): string {
  // Use the current hostname or default to killcrave.com
  const hostname = typeof window !== 'undefined'
    ? window.location.hostname
    : 'www.killcrave.com';

  const protocol = hostname === 'localhost' ? 'http' : 'https';
  return `${protocol}://${hostname}/go/${slug}`;
}

// Generate trackable link for a campaign
export function generateTrackableLink(slug: string): string {
  return generateQRCodeURL(slug);
}
