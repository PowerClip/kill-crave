import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getRedirectConfig } from '@/config/redirects';
import { trackEvent } from '@/lib/analytics';
import { trackToKV } from '@/lib/analytics-store';

const GoRedirect = () => {
  const { path } = useParams<{ path: string }>();

  useEffect(() => {
    if (path) {
      const config = getRedirectConfig(path);

      if (config?.trackingEnabled && config.campaignName) {
        // Track to Facebook/TikTok
        trackEvent('qr_code_scan', {
          campaign: config.campaignName,
          source: 'qr_code',
          path: `/go/${path}`
        });

        // Track to our analytics
        trackToKV({
          event: 'qr_scan',
          metrics: ['qr:flyers:scans'],
        });
      }
    }
  }, [path]);

  if (!path) {
    return <Navigate to="/" replace />;
  }

  const config = getRedirectConfig(path);

  if (!config) {
    return <Navigate to="/" replace />;
  }

  return <Navigate to={config.destination} replace />;
};

export default GoRedirect;