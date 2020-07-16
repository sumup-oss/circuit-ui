import { currencyUtils } from '@sumup/circuit-ui';

const amount = '42';
const locale = 'en-US';
const currency = 'USD';

currencyUtils.formatAmountForLocale(amount, currency, locale);
