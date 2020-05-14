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
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { values } from 'lodash/fp';
import { resolveCurrencyFormat, CURRENCIES } from '@sumup/intl';
import TextMaskInput from 'react-text-mask';

import { localePropType } from '../../util/shared-prop-types';
import Input from '../Input';
import {
  createCurrencyMask,
  formatPlaceholder,
  getSymbolLength
} from './CurrencyInputService';

// This is dynamic and cannot be done in pure CSS. No need for a label.
const iconWidthStyles = length => css`
  width: ${length}px !important;
`;

const CurrencyIcon = styled('span')`
  label: simple-currency-input__symbol;
  line-height: ${({ theme }) => theme.spacings.mega};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const inputBaseStyles = () => css`
  label: currency-input__input;
  text-align: right;
`;

const inputPrependStyles = ({ theme, symbolLength, prependSymbol }) =>
  prependSymbol &&
  css`
    label: currency-input__input--prepend-symbol;
    padding-left: calc(${theme.spacings.mega} + ${symbolLength}px);
  `;

const inputAppendStyles = ({ theme, symbolLength, prependSymbol }) =>
  !prependSymbol &&
  css`
    label: currency-input__input--append-symbol;
    padding-right: calc(${theme.spacings.mega} + ${symbolLength}px);
  `;

/**
 * CurrencyInput component for forms. Automatically looks up
 * symbols and places the symbol according to the locale. The corresponding
 * service exports a parser for formatting values automatically.
 */
const CurrencyInput = ({ locale, currency, placeholder, ...props }) => {
  const theme = useTheme();

  const currencyFormat = resolveCurrencyFormat(locale, currency);
  const { currencyPosition, currencySymbol } = currencyFormat;
  const numberMask = createCurrencyMask(currencyFormat, locale);
  const symbolLength = getSymbolLength(currencySymbol);
  const placeholderString = formatPlaceholder(placeholder, locale, {
    minimumFractionDigits: currencyFormat.minimumFractionDigits,
    maximumFractionDigits: currencyFormat.maximumFractionDigits
  });

  const renderPrefix =
    currencyPosition === 'prefix'
      ? preffixProps => (
          <CurrencyIcon {...preffixProps} css={iconWidthStyles(symbolLength)}>
            {currencySymbol}
          </CurrencyIcon>
        )
      : null;

  const renderSuffix =
    currencyPosition === 'suffix'
      ? suffixProps => (
          <CurrencyIcon {...suffixProps} css={iconWidthStyles(symbolLength)}>
            {currencySymbol}
          </CurrencyIcon>
        )
      : null;

  return (
    <TextMaskInput
      guide={false}
      render={(ref, { defaultValue, ...renderProps }) => (
        <Input value={defaultValue} {...renderProps} deepRef={ref} />
      )}
      inputStyles={css([
        inputBaseStyles(),
        inputPrependStyles({ theme, symbolLength, currencyPosition }),
        inputAppendStyles({ theme, symbolLength, currencyPosition })
      ])}
      renderPrefix={renderPrefix}
      renderSuffix={renderSuffix}
      type="text"
      mask={numberMask}
      placeholder={placeholderString}
      {...props}
    />
  );
};

CurrencyInput.propTypes = {
  ...Input.propTypes,
  /**
   * A ISO 4217 currency code, such as 'USD' for the US dollar,
   * 'EUR' for the Euro, or 'CNY' for the Chinese RMB.
   */
  currency: PropTypes.oneOf(values(CURRENCIES)),
  /**
   * One or more Unicode BCP 47 locale identifiers, such as 'de-DE' or
   * ['GB', 'en-US'] (the first supported locale is used).
   */
  locale: localePropType(),
  /**
   * A short string that is shown inside the empty input.
   * If the placeholder is a number, it is formatted in the local
   * currency format.
   */
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

/**
 * @component
 */
export default CurrencyInput;
