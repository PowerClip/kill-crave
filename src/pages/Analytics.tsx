import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, ExternalLink } from 'lucide-react';

export default function Analytics() {
  const navigate = useNavigate();

  const handleOpenGoogleAnalytics = () => {
    window.open('https://analytics.google.com/', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BarChart3 className="h-16 w-16 text-blue-600" />
          </div>
          <CardTitle className="text-3xl">Analytics Dashboard</CardTitle>
          <CardDescription className="text-base mt-2">
            Consultez vos statistiques détaillées sur Google Analytics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Google Tag Manager Configuré</h3>
            <p className="text-sm text-blue-800">
              Votre site utilise Google Tag Manager (GTM-M7WL8CNV) pour collecter automatiquement les données d'analytics.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Données disponibles :</h3>
            <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
              <li>Pages vues et visiteurs uniques</li>
              <li>Sources de trafic et conversions</li>
              <li>Comportement des utilisateurs</li>
              <li>Données démographiques et géographiques</li>
              <li>Performance des campagnes</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleOpenGoogleAnalytics}
              className="flex-1 flex items-center justify-center gap-2"
            >
              Ouvrir Google Analytics
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="flex-1"
            >
              Retour à l'accueil
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center pt-4 border-t">
            Les données sont mises à jour en temps réel sur Google Analytics
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
