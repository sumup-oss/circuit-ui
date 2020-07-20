import { formatCurrency, formatAmountForLocale } from '@sumup/intl';

const amount = '42';
const locale = 'en-US';
const currency = 'USD';

formatCurrency(amount, locale, currency);
formatAmountForLocale(amount, locale, currency);
