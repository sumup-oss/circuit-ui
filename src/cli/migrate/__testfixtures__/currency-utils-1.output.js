import { formatCurrency, format } from '@sumup/intl';

const amount = '42';
const locale = 'en-US';
const currency = 'USD';

formatCurrency(amount, locale, currency);
format(amount, locale, currency);
