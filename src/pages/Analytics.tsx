import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Monitor, Globe, TrendingUp } from 'lucide-react';

interface AnalyticsData {
  pageviews?: number;
  visitors?: number;
  topPages?: Array<{ page: string; views: number }>;
  topCountries?: Array<{ country: string; visitors: number }>;
  devices?: {
    desktop?: number;
    mobile?: number;
    tablet?: number;
  };
}

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/analytics/vercel-stats');

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch analytics');
        }

        const analyticsData = await response.json();
        setData(analyticsData);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load analytics');
        console.error('Analytics error:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Erreur</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Assurez-vous que les variables d'environnement suivantes sont configurées dans Vercel:
            </p>
            <ul className="text-sm text-gray-600 mb-4 list-disc list-inside">
              <li>VERCEL_ANALYTICS_TOKEN</li>
              <li>VERCEL_PROJECT_ID</li>
              <li>VERCEL_TEAM_ID (optionnel)</li>
            </ul>
            <Button onClick={() => navigate('/')}>
              Retour à l'accueil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const pageviews = data?.pageviews || 0;
  const visitors = data?.visitors || 0;
  const desktopViews = data?.devices?.desktop || 0;
  const mobileViews = data?.devices?.mobile || 0;
  const tabletViews = data?.devices?.tablet || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Statistiques Vercel Analytics</p>
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="mt-4"
          >
            Retour à l'accueil
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pages vues</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pageviews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total des vues</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visiteurs</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{visitors.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Visiteurs uniques</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Desktop</CardTitle>
              <Monitor className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{desktopViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {mobileViews} mobile • {tabletViews} tablet
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux mobile</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {pageviews > 0 ? Math.round((mobileViews / pageviews) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">Visites mobiles</p>
            </CardContent>
          </Card>
        </div>

        {/* Top Pages */}
        {data?.topPages && data.topPages.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Pages les plus visitées</CardTitle>
              <CardDescription>Classement des pages par nombre de vues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl font-bold text-gray-400 w-8">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{page.page}</p>
                      </div>
                    </div>
                    <div className="text-xl font-bold">{page.views.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Top Countries */}
        {data?.topCountries && data.topCountries.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Pays des visiteurs
              </CardTitle>
              <CardDescription>Distribution géographique</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.topCountries.map((country, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl font-bold text-gray-400 w-8">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{country.country}</p>
                      </div>
                    </div>
                    <div className="text-xl font-bold">{country.visitors.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty state */}
        {!data?.topPages && !data?.topCountries && (
          <Card>
            <CardHeader>
              <CardTitle>Aucune donnée disponible</CardTitle>
              <CardDescription>
                Les données d'analytics apparaîtront ici une fois que vous aurez configuré l'API Vercel Analytics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Consultez la documentation de Vercel pour obtenir votre token d'API et configurer les variables d'environnement.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
