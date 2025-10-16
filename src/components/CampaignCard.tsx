import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { QRCodeGenerator } from './QRCodeGenerator';
import { Campaign, generateTrackableLink, deleteCampaign } from '@/lib/campaigns';
import { Copy, QrCode, Trash2, ExternalLink, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface CampaignCardProps {
  campaign: Campaign;
  password?: string;
  onDelete?: () => void;
}

export function CampaignCard({ campaign, password, onDelete }: CampaignCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const trackableLink = generateTrackableLink(campaign.slug);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Lien copié dans le presse-papier!');
    } catch (e) {
      toast.error('Erreur lors de la copie');
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer la campagne "${campaign.name}" ?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const success = await deleteCampaign(campaign.slug, password);
      if (success) {
        toast.success('Campagne supprimée avec succès');
        onDelete?.();
      } else {
        toast.error('Erreur lors de la suppression');
      }
    } catch (e) {
      toast.error('Erreur lors de la suppression');
    } finally {
      setIsDeleting(false);
    }
  };

  const formattedDate = format(new Date(campaign.createdAt), 'dd MMMM yyyy', { locale: fr });

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">{campaign.name}</CardTitle>
            <CardDescription className="mt-1">
              {campaign.description || 'Aucune description'}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-blue-900">Scans</span>
          </div>
          <span className="text-2xl font-bold text-blue-600">{campaign.scans}</span>
        </div>

        {/* Trackable Link */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Lien tracké</label>
          <div className="flex gap-2">
            <div className="flex-1 p-2 bg-gray-50 rounded border border-gray-200 text-sm font-mono truncate">
              {trackableLink}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(trackableLink)}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.open(trackableLink, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* QR Code Button */}
        <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
          <DialogTrigger asChild>
            <Button className="w-full" variant="default">
              <QrCode className="h-4 w-4 mr-2" />
              Voir le QR Code
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>QR Code - {campaign.name}</DialogTitle>
              <DialogDescription>
                Scannez ce code pour accéder à Kill Crave
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center py-4">
              <QRCodeGenerator
                value={trackableLink}
                size={256}
                campaignName={campaign.name}
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Meta info */}
        <div className="text-xs text-gray-500 border-t pt-3 flex items-center justify-between">
          <span>Slug: {campaign.slug}</span>
          <span>Créée le {formattedDate}</span>
        </div>
      </CardContent>
    </Card>
  );
}
