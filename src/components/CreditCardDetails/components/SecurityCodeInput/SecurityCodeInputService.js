import { schemes } from '../..';

const { SCHEMES } = schemes;

export const getPlaceholder = cardScheme =>
  cardScheme === SCHEMES.AMEX ? '1234' : '123';
