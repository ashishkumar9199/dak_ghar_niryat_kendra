import { CbicExchangeRate } from '../types';

export const DEFAULT_CBIC_EXCHANGE_RATES: CbicExchangeRate[] = [
  {
    currencyCode: 'USD',
    currencyName: 'US Dollar',
    symbol: '$',
    exportRateINR: 86.85,
    importRateINR: 88.10,
    unit: 1,
    countryCodes: ['US', 'UM', 'PR', 'VI'],
    effectiveDate: 'August 2026',
    notificationRef: 'CBIC Notif. No. 14/2026-Customs (N.T.)'
  },
  {
    currencyCode: 'EUR',
    currencyName: 'Euro',
    symbol: '€',
    exportRateINR: 91.40,
    importRateINR: 93.25,
    unit: 1,
    countryCodes: ['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'IE', 'PT', 'FI', 'GR'],
    effectiveDate: 'August 2026',
    notificationRef: 'CBIC Notif. No. 14/2026-Customs (N.T.)'
  },
  {
    currencyCode: 'GBP',
    currencyName: 'British Pound Sterling',
    symbol: '£',
    exportRateINR: 109.80,
    importRateINR: 112.15,
    unit: 1,
    countryCodes: ['GB', 'UK'],
    effectiveDate: 'August 2026',
    notificationRef: 'CBIC Notif. No. 14/2026-Customs (N.T.)'
  },
  {
    currencyCode: 'AED',
    currencyName: 'UAE Dirham',
    symbol: 'AED',
    exportRateINR: 23.65,
    importRateINR: 24.15,
    unit: 1,
    countryCodes: ['AE'],
    effectiveDate: 'August 2026',
    notificationRef: 'CBIC Notif. No. 14/2026-Customs (N.T.)'
  },
  {
    currencyCode: 'AUD',
    currencyName: 'Australian Dollar',
    symbol: 'A$',
    exportRateINR: 55.30,
    importRateINR: 56.85,
    unit: 1,
    countryCodes: ['AU'],
    effectiveDate: 'August 2026',
    notificationRef: 'CBIC Notif. No. 14/2026-Customs (N.T.)'
  },
  {
    currencyCode: 'CAD',
    currencyName: 'Canadian Dollar',
    symbol: 'C$',
    exportRateINR: 60.80,
    importRateINR: 62.45,
    unit: 1,
    countryCodes: ['CA'],
    effectiveDate: 'August 2026',
    notificationRef: 'CBIC Notif. No. 14/2026-Customs (N.T.)'
  },
  {
    currencyCode: 'JPY',
    currencyName: 'Japanese Yen (per 100)',
    symbol: '¥',
    exportRateINR: 56.40,
    importRateINR: 58.10,
    unit: 100,
    countryCodes: ['JP'],
    effectiveDate: 'August 2026',
    notificationRef: 'CBIC Notif. No. 14/2026-Customs (N.T.)'
  },
  {
    currencyCode: 'SGD',
    currencyName: 'Singapore Dollar',
    symbol: 'S$',
    exportRateINR: 64.75,
    importRateINR: 66.20,
    unit: 1,
    countryCodes: ['SG'],
    effectiveDate: 'August 2026',
    notificationRef: 'CBIC Notif. No. 14/2026-Customs (N.T.)'
  },
  {
    currencyCode: 'SAR',
    currencyName: 'Saudi Riyal',
    symbol: 'SAR',
    exportRateINR: 23.15,
    importRateINR: 23.70,
    unit: 1,
    countryCodes: ['SA'],
    effectiveDate: 'August 2026',
    notificationRef: 'CBIC Notif. No. 14/2026-Customs (N.T.)'
  },
  {
    currencyCode: 'CHF',
    currencyName: 'Swiss Franc',
    symbol: 'CHF',
    exportRateINR: 96.20,
    importRateINR: 98.65,
    unit: 1,
    countryCodes: ['CH'],
    effectiveDate: 'August 2026',
    notificationRef: 'CBIC Notif. No. 14/2026-Customs (N.T.)'
  },
  {
    currencyCode: 'NZD',
    currencyName: 'New Zealand Dollar',
    symbol: 'NZ$',
    exportRateINR: 50.20,
    importRateINR: 51.65,
    unit: 1,
    countryCodes: ['NZ'],
    effectiveDate: 'August 2026',
    notificationRef: 'CBIC Notif. No. 14/2026-Customs (N.T.)'
  },
  {
    currencyCode: 'HKD',
    currencyName: 'Hong Kong Dollar',
    symbol: 'HK$',
    exportRateINR: 11.15,
    importRateINR: 11.45,
    unit: 1,
    countryCodes: ['HK'],
    effectiveDate: 'August 2026',
    notificationRef: 'CBIC Notif. No. 14/2026-Customs (N.T.)'
  }
];

export const getCurrencyForCountry = (countryCode: string): string => {
  const match = DEFAULT_CBIC_EXCHANGE_RATES.find(r => r.countryCodes.includes(countryCode.toUpperCase()));
  return match ? match.currencyCode : 'USD';
};
