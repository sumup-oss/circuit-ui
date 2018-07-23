import {
  // Utils for CardNumberInput
  isValidCardNumber,
  isAcceptedCardScheme,
  normalizeCardNumber,
  detectCardScheme,
  // Utils for ExpiryDateInput
  isFutureDate,
  isCompleteMonth,
  isCompleteYear,
  normalizeExpiryDate,
  // Utils for SecurityCodeInput
  isValidSecurityCode,
  // Misc
  schemes as ALL_CARD_SCHEMES
} from '.';

const cardNumberUtils = {
  isValidCardNumber,
  isAcceptedCardScheme,
  normalizeCardNumber,
  detectCardScheme
};

const expiryDateUtils = {
  isFutureDate,
  isCompleteMonth,
  isCompleteYear,
  normalizeExpiryDate
};

const securityCodeUtils = {
  isValidSecurityCode
};

export {
  default as CreditCardDetails,
  CardNumberInput,
  cardSchemeIcons,
  NameOnCardInput,
  SecurityCodeInput,
  ExpiryDateInput
} from '.';

export {
  cardNumberUtils,
  expiryDateUtils,
  securityCodeUtils,
  ALL_CARD_SCHEMES
};
