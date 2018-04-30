import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'emotion-theming';

import { keys } from '../../util/fp';
import { themePropType, localePropType } from '../../util/shared-prop-types';
import { shouldPrependSymbol, CURRENCY_SYMBOLS } from '../../util/currency';

import { createCurrencyMask } from './CurrencyInputService';
import { SimpleCurrencyInput } from './components';

/**
 * CurrencyInput component for forms. Automatically looks up
 * symbols and places the symbol according to the locale. The corresponding
 * service exports a parser for formatting values automatically.
 */
const CurrencyInput = ({ locale, currency, ...props }) => {
  const prependSymbol = shouldPrependSymbol(currency, locale);
  const symbol = CURRENCY_SYMBOLS[currency] || '';
  const numberMask = createCurrencyMask(currency, locale);

  return (
    <SimpleCurrencyInput {...{ ...props, prependSymbol, symbol, numberMask }} />
  );
};

CurrencyInput.propTypes = {
  theme: themePropType.isRequired,
  // eslint-disable-next-line
  locale: localePropType(true),
  currency: PropTypes.oneOf(keys(CURRENCY_SYMBOLS)).isRequired
};

/**
 * @component
 */
export default withTheme(CurrencyInput);
