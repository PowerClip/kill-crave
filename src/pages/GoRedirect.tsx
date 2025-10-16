import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';
import { trackToKV } from '@/lib/analytics-store';

interface Campaign {
  slug: string;
  name: string;
  destination: string;
  description: string;
  createdAt: string;
}

const GoRedirect = () => {
  const { path } = useParams<{ path: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      if (!path) {
        setLoading(false);
        return;
      }

      try {
        // Fetch campaign from API
        const response = await fetch(`/api/campaigns/get?slug=${path}`);

        if (response.ok) {
          const data = await response.json();
          setCampaign(data.campaign);
        }
      } catch (e) {
        console.error('Failed to fetch campaign:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [path]);

  useEffect(() => {
    if (campaign && !tracked) {
      // Track to Facebook/TikTok/Google Analytics
      trackEvent('qr_code_scan', {
        campaign: campaign.name,
        source: 'qr_code',
        path: `/go/${path}`
      });

      // Track to Vercel KV
      trackToKV({
        event: 'qr_scan',
        metrics: [`qr:${campaign.slug}:scans`]
      });

      setTracked(true);

      // Redirect to external URL after tracking
      setTimeout(() => {
        window.location.href = campaign.destination;
      }, 100);
    }
  }, [campaign, tracked, path]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!path || !campaign) {
    return <Navigate to="/" replace />;
  }

  // Show loading while tracking and redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
};

export default GoRedirect;