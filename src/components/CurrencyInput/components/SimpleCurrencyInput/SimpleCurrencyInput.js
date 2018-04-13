import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, cx } from 'react-emotion';
import { withTheme } from 'emotion-theming';

import Input from '../../../Input';
import { themePropType } from '../../../../util/shared-prop-types';

const iconBaseStyles = ({ theme }) => css`
  label: simple-currency-input__symbol;
  color: ${theme.colors.b700};
  line-height: ${theme.spacings.mega};
`;

// This is dymanic and cannot be done in pure CSS. No need for
// a label.
const iconOverrideWidthStyles = ({ symbol = '' }) => css`
  width: ${symbol.length}ch;
`;

const CurrencyIcon = styled('span')`
  ${iconBaseStyles};
`;

const inputStyles = ({ theme }) => css`
  label: currency-input__input;
  color: transparent;
  text-shadow: 0 0 0 ${theme.colors.n900};
`;

const inputPrependStyles = ({ theme, symbol = '', prependSymbol }) =>
  prependSymbol &&
  css`
    label: currency-input__input--prepend-symbol;
    padding-left: ${theme.spacings.exa};
    padding-left: calc(${theme.spacings.giga} + ${symbol.length}ch);
  `;

const inputAppendStyles = ({ theme, symbol = '', prependSymbol }) =>
  !prependSymbol &&
  css`
    label: currency-input__input--prepend-symbol;
    padding-right: ${theme.spacings.exa};
    padding-right: calc(${theme.spacings.giga} + ${symbol.length}ch);
  `;

/**
 * A simple currency input for forms.
 */
const SimpleCurrencyInput = ({ prependSymbol, theme, symbol, ...props }) => {
  const iconWidthClassName = iconOverrideWidthStyles({ symbol });
  const inputClassName = cx(
    inputStyles({ theme }),
    inputPrependStyles({
      theme,
      symbol,
      prependSymbol
    }),
    inputAppendStyles({
      theme,
      symbol,
      prependSymbol
    })
  );

  return (
    <Input
      inputClassName={inputClassName}
      renderPrefix={({ className }) =>
        prependSymbol && (
          <CurrencyIcon
            className={cx(className, iconWidthClassName)}
            symbol={symbol}
          >
            {symbol}
          </CurrencyIcon>
        )
      }
      renderSuffix={({ className }) =>
        !prependSymbol && (
          <CurrencyIcon
            className={cx(className, iconWidthClassName)}
            symbol={symbol}
          >
            {symbol}
          </CurrencyIcon>
        )
      }
      textAlign={Input.RIGHT}
      {...props}
    />
  );
};

SimpleCurrencyInput.propTypes = {
  theme: themePropType.isRequired,
  /**
   * Currency symbol to be shown.
   */
  symbol: PropTypes.string.isRequired,
  /**
   * Should the symbol be put on the left side
   * of the input?
   */
  prependSymbol: PropTypes.bool
};

SimpleCurrencyInput.defaultProps = {
  prependSymbol: false
};

/**
 * @component
 */
export default withTheme(SimpleCurrencyInput);
