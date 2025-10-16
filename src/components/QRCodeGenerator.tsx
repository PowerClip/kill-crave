import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  campaignName?: string;
}

export function QRCodeGenerator({ value, size = 256, campaignName }: QRCodeGeneratorProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = (format: 'png' | 'svg') => {
    if (!qrRef.current) return;

    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const fileName = campaignName
      ? `qr-${campaignName.toLowerCase().replace(/\s+/g, '-')}.${format}`
      : `qr-code.${format}`;

    if (format === 'svg') {
      // Download as SVG
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);

      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
    } else {
      // Download as PNG
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const svgData = new XMLSerializer().serializeToString(svg);
      const img = new Image();

      img.onload = () => {
        canvas.width = size;
        canvas.height = size;

        // Fill white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw QR code
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);

          const downloadLink = document.createElement('a');
          downloadLink.href = url;
          downloadLink.download = fileName;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          URL.revokeObjectURL(url);
        });
      };

      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={qrRef}
        className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
      >
        <QRCodeSVG
          value={value}
          size={size}
          level="H"
          includeMargin={true}
        />
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => downloadQRCode('png')}
          variant="outline"
          size="sm"
        >
          <Download className="h-4 w-4 mr-2" />
          PNG
        </Button>
        <Button
          onClick={() => downloadQRCode('svg')}
          variant="outline"
          size="sm"
        >
          <Download className="h-4 w-4 mr-2" />
          SVG
        </Button>
      </div>
    </div>
  );
}
