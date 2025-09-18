interface RedirectConfig {
  destination: string;
  trackingEnabled?: boolean;
  campaignName?: string;
}

export const redirects: Record<string, RedirectConfig> = {
  'flyers': {
    destination: '/',
    trackingEnabled: true,
    campaignName: 'flyers-campaign'
  },
  // Ajoutez d'autres redirections ici selon vos besoins
  // 'menu': {
  //   destination: '/menu',
  //   trackingEnabled: true,
  //   campaignName: 'menu-qr'
  // },
  // 'promo': {
  //   destination: '/special-offer',
  //   trackingEnabled: true,
  //   campaignName: 'promo-2024'
  // }
};

export const getRedirectConfig = (path: string): RedirectConfig | null => {
  return redirects[path] || null;
};