import { formatAmountForLocale } from '@sumup/intl';

const amount = '42';
const locale = 'en-US';
const currency = 'USD';

formatAmountForLocale(amount, locale, currency);
