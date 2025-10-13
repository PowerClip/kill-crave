import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Smartphone, Monitor, Globe, ShoppingCart, Eye, CreditCard, QrCode } from 'lucide-react';
import { AnalyticsStats } from '@/lib/kv';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function Analytics() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const fetchStats = async (authPassword?: string) => {
    try {
      setLoading(true);
      setError(null);

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (authPassword) {
        headers['Authorization'] = `Bearer ${authPassword}`;
      }

      const response = await fetch('/api/analytics/stats', { headers });

      if (response.status === 401) {
        setIsAuthenticated(false);
        setError('Mot de passe requis');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const data = await response.json();
      setStats(data);
      setIsAuthenticated(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Try without password first
    fetchStats();
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStats(password);
  };

  if (!isAuthenticated && error === 'Mot de passe requis') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription>Entrez le mot de passe pour accéder aux statistiques</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full">
                Accéder
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

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

  if (error && error !== 'Mot de passe requis') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Erreur</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')}>
              Retour à l'accueil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!stats) return null;

  // Prepare data for charts
  const deviceData = [
    { name: 'iPhone', value: stats['device:iphone'] || 0 },
    { name: 'Android', value: stats['device:android'] || 0 },
    { name: 'Mac', value: stats['device:mac'] || 0 },
    { name: 'Windows', value: stats['device:windows'] || 0 },
  ].filter(d => d.value > 0);

  const countryData = [
    { name: 'France', value: stats['country:FR'] || 0, code: 'FR' },
    { name: 'Belgique', value: stats['country:BE'] || 0, code: 'BE' },
    { name: 'Suisse', value: stats['country:CH'] || 0, code: 'CH' },
    { name: 'Canada', value: stats['country:CA'] || 0, code: 'CA' },
    { name: 'États-Unis', value: stats['country:US'] || 0, code: 'US' },
    { name: 'Autres', value: stats['country:other'] || 0, code: 'other' },
  ].filter(d => d.value > 0);

  const funnelData = [
    { name: 'Visites', value: stats['visits:total'] || 0 },
    { name: 'Vues produit', value: stats['events:view_content'] || 0 },
    { name: 'Ajouts panier', value: stats['events:add_to_cart'] || 0 },
    { name: 'Checkouts', value: stats['events:initiate_checkout'] || 0 },
  ];

  const totalVisits = stats['visits:total'] || 0;
  const mobileVisits = stats['device:mobile'] || 0;
  const desktopVisits = stats['device:desktop'] || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Statistiques en temps réel de votre site</p>
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
              <CardTitle className="text-sm font-medium">Visiteurs totaux</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVisits}</div>
              <p className="text-xs text-muted-foreground">
                {mobileVisits} mobile • {desktopVisits} desktop
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vues produit</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats['events:view_content'] || 0}</div>
              <p className="text-xs text-muted-foreground">
                Produit consulté
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ajouts au panier</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats['events:add_to_cart'] || 0}</div>
              <p className="text-xs text-muted-foreground">
                Intentions d'achat
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Checkouts</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats['events:initiate_checkout'] || 0}</div>
              <p className="text-xs text-muted-foreground">
                Processus de paiement
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Device Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Répartition par appareil
              </CardTitle>
              <CardDescription>Distribution des visiteurs par type d'appareil</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Country Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Répartition par pays
              </CardTitle>
              <CardDescription>Distribution géographique des visiteurs</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={countryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {countryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Conversion Funnel */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Funnel de conversion</CardTitle>
            <CardDescription>Parcours des visiteurs de la visite au checkout</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="value" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* QR Codes Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              QR Codes
            </CardTitle>
            <CardDescription>Statistiques des campagnes QR codes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Flyers</p>
                  <p className="text-sm text-muted-foreground">Campagne flyers</p>
                </div>
                <div className="text-2xl font-bold">{stats['qr:flyers:scans'] || 0}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
