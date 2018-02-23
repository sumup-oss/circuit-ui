import _ from 'lodash';

/* eslint-enable max-len */
const CARD_SCHEMES_PL = ['mastercard', 'visa', 'amex', 'jcb'];
const CARD_SCHEMES_SE = ['mastercard', 'visa', 'amex', 'discover', 'diners'];
const CARD_SCHEMES_CL = ['mastercard', 'visa'];
const CARD_SCHEMES_BR = [
  'visa',
  'mastercard',
  'elo',
  'hipercard',
  'amex',
  'discover',
  'diners',
  'jcb'
];
const CARD_SCHEMES_NEW_COUNTRIES = ['visa', 'mastercard']; /* EUEXP_EXPANSION */

const CARD_SCHEMES_DEFAULT = [
  'mastercard',
  'visa',
  'amex',
  'discover',
  'diners',
  'jcb'
];

const CARD_SCHEMES_PRIORITIES = {
  BR: {
    amex: 100,
    diners: 100,
    discover: 90,
    elo: 100,
    hipercard: 100,
    jcb: 100,
    mastercard: 100,
    visa: 100
  },
  default: {
    amex: 100,
    diners: 100,
    discover: 100,
    jcb: 100,
    mastercard: 100,
    visa: 100
  }
};
/* eslint-disable max-len */

/* ELO BIN REGEXES */
const ELO_REGEXES = {
  elo_starting_with_4:
    '((40117[8-9])|(43(1274)|(8935))|(451416)|(457393)(45763[1-2]))',
  elo_starting_with_5: '(504175)',
  elo_range_506699_506778: '((506699)|(5067[0-6][0-9])|(50677[0-8]))',
  elo_range_509000_509999: '(509\\d{3})',
  elo_range_627780: '(627780)',
  elo_range_636297_636368: '(636(297)|(368))',
  elo_range_650031_650033: '(65003[1-3])',
  elo_range_650035_650051: '((63003[5-9])|(65004[0-9])|(65005[0-1]))',
  elo_range_650405_650439: '((65040[5-9])|(6504[1-3][0-9]))',
  elo_range_650485_650538:
    '((65048[5-9])|(65049[0-9])|(6505[0-2][0-9])|(65053[0-8]))',
  elo_range_650541_650598: '((65054[1-9])|(6505[5-8][0-9])|(65059[0-8]))',
  elo_range_650700_650718: '((65070[0-9])|(65071[0-8]))',
  elo_range_650720_650727: '(65072[0-7])',
  elo_range_650901_650920: '((65090[1-9])|(65091[0-9])|(650920))',
  elo_range_651652_651679: '((65165[2-9])|(6516[6-7][0-9]))',
  elo_range_655000_655019: '(6550[0-1][0-9])',
  elo_range_655021_655058: '((65502[0-9])|(6550[3-4][0-9])|(65505[0-8]))'
};

const ELO_REGEX = _.values(ELO_REGEXES).join('|');

export const cardSchemes = {
  visa: /^4\d{12}(?:\d{3})?$/,
  mastercard: /^(?:2(?:2(?:2[1-9]\d{2}|[3-9]\d{3})|[3-6]\d{4}|7(?:[0-1]\d{3}|20\d{2}))|5[1-5]\d{4})\d{10}$/,
  amex: /^3[47]\d{13}$/,
  diners: /^(?:3(?:0(?:[0-5]\d|95)|[68-9]\d{2}))\d{10}$/,
  discover: /^6(?:011\d{2}|22(?:1(?:2[6-9]|[3-9]\d)|[2-8]\d{2}|9(?:[0-1]\d|2[0-5]))|4[4-9]\d{3}|5\d{4})\d{10}$/,
  // maestro: /^(?:5[06-9]|6(?:3(?:04|90)|7))\d+$/,
  jcb: /^35\d{14}$/,
  elo: new RegExp(`^${ELO_REGEX}\\d{10}$`),
  hipercard: /^6((06282)|(37((599)|(095)|(568))))\d{10}$/
  /* eslint-enable max-len */
};

export function getAcceptedCardSchemes(country, context = 'shop') {
  const shop = {
    PL: CARD_SCHEMES_PL,
    SE: CARD_SCHEMES_SE,
    CL: CARD_SCHEMES_CL,
    BR: CARD_SCHEMES_BR,
    default: getDefaultCardSchemes(country)
  };

  const otp = {
    PL: CARD_SCHEMES_PL,
    SE: CARD_SCHEMES_SE,
    CL: CARD_SCHEMES_CL,
    BR: CARD_SCHEMES_BR,
    default: getDefaultCardSchemes(country)
  };

  const contexts = { shop, otp };
  const supportedSchemes = _.get(contexts, context, 'shop'); // Context can be "shop" or "otp"
  return _.get(supportedSchemes, country, supportedSchemes.default);
}

function getDefaultCardSchemes(country) {
  if (isNewEuCountry(country)) {
    return CARD_SCHEMES_NEW_COUNTRIES;
  }
  return CARD_SCHEMES_DEFAULT;
}

export function isValidLength(cardNumber) {
  if (!cardNumber) {
    return false;
  }
  const schemes = {
    '^4': [16], // Visa
    '^(?:2(?:2(?:2[1-9]|[3-9])|[3-6]|7(?:[0-1]|20))|5[1-5])': [16], // MasterCard
    '^3[47]': [15], // American Express
    '^(?:3(?:0(?:[0-5]|95)|[68-9]))': [14], // Diner's Club
    '^6(?:011|22(?:1(?:2[6-9]|[3-9])|[2-8]|9(?:[0-1]|2[0-5]))|4[4-9]|5)': [16], // Discover
    '^(?:5[06-9]|6(?:3(?:04|90)|7))': [13, 14, 15, 16, 17, 18, 19], // Maestro
    '^35': [16] // Japan Credit Bureau
  };
  const hasValidLength = _.find(schemes, hasValidSchemeLength(cardNumber));
  return hasValidLength !== undefined || cardNumber.length >= 13;
}

function hasValidSchemeLength(cardNumber) {
  return function testSchemeLength(pattern, lengths) {
    const regex = new RegExp(pattern);
    return regex.test(cardNumber) && _.includes(lengths, cardNumber.length);
  };
}

export function detectCardScheme(cardNumber, country, context = 'shop') {
  if (!cardNumber) {
    return '';
  }
  const acceptedSchemes = _.pick(
    cardSchemes,
    getAcceptedCardSchemes(country, context)
  );
  const card = cardNumber.replace(/-|\s/g, '');
  const schemeName = determineCardScheme(acceptedSchemes, card, country);
  if (!luhnCheck(cardNumber)) {
    return '';
  }
  return schemeName;
}

function determineCardScheme(cardSchemes, cardNumber, country) {
  const cardSchemesPriorityMap = _.get(
    CARD_SCHEMES_PRIORITIES,
    country,
    CARD_SCHEMES_PRIORITIES.default
  );
  const detectedCardSchemes = _.reduce(
    cardSchemes,
    testCardNumber(cardNumber),
    []
  );
  return _.reduce(
    detectedCardSchemes,
    selectCardSchemeByPriority(cardSchemesPriorityMap),
    ''
  );
}

function selectCardSchemeByPriority(priority_object) {
  return function reducer(memo, value) {
    if (priority_object[value] > memo) {
      memo = value;
    }
    return memo;
  };
}

function testCardNumber(cardNumber) {
  return function reducer(memo, scheme, schemeName) {
    if (scheme.test(cardNumber)) {
      memo.push(schemeName);
    }
    return memo;
  };
}

/**
 * copied from
 * https://gist.github.com/DiegoSalazar/4075533
 */
function luhnCheck(value) {
  if (/[^\d-\s]+/.test(value)) {
    return false;
  }

  let nCheck = 0;
  let nDigit = 0;
  let bEven = false;
  value = value.replace(/\D/g, '');

  for (let n = value.length - 1; n >= 0; n--) {
    const cDigit = value.charAt(n);
    nDigit = parseInt(cDigit, 10);

    if (bEven) {
      if ((nDigit *= 2) > 9) {
        nDigit -= 9;
      }
    }

    nCheck += nDigit;
    bEven = !bEven;
  }

  return nCheck % 10 === 0;
}
