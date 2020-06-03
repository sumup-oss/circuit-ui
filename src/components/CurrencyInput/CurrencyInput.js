/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { keys } from '../../util/fp';
import { themePropType, localePropType } from '../../util/shared-prop-types';
import { shouldPrependSymbol, CURRENCY_SYMBOLS } from '../../util/currency';

import { createCurrencyMask } from './CurrencyInputService';
import { SimpleCurrencyInput } from './components';

const CurrencyInputComponent = ({ locale, currency, ...props }, ref) => {
  const prependSymbol = shouldPrependSymbol(currency, locale);
  const symbol = CURRENCY_SYMBOLS[currency] || '';
  const numberMask = createCurrencyMask(currency, locale);

  return (
    <SimpleCurrencyInput
      {...{ ...props, prependSymbol, symbol, numberMask }}
      ref={ref}
    />
  );
};

/**
 * CurrencyInput component for forms. Automatically looks up
 * symbols and places the symbol according to the locale. The corresponding
 * service exports a parser for formatting values automatically.
 */
const CurrencyInput = React.forwardRef(CurrencyInputComponent);

CurrencyInput.propTypes = {
  theme: themePropType.isRequired,
  locale: localePropType(true),
  currency: PropTypes.oneOf(keys(CURRENCY_SYMBOLS)).isRequired,
  /**
   * The ref to the html dom element
   */
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.oneOf([PropTypes.instanceOf(HTMLInputElement)])
    })
  ])
};

/**
 * @component
 */
export default CurrencyInput;
