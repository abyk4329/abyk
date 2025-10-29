import { SITE } from '@/lib/constants';

export const BRAND = {
  appName: 'Awakening by Ksenia',
  shortName: 'ABYK',
  siteUrl: SITE.url,
  defaultSender: 'Awakening by Ksenia <awakening.by.ksenia@gmail.com>',
} as const;

export type BrandConfig = typeof BRAND;
