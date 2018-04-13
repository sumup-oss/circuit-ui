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

const inputOverridePaddingStyles = ({ theme, symbol = '', prependSymbol }) =>
  prependSymbol
    ? css`
        padding-left: calc(${theme.spacings.giga} + ${symbol.length}ch);
      `
    : css`
        padding-right: calc(${theme.spacings.giga} + ${symbol.length}ch);
      `;

/**
 * A simple currency input for forms.
 */
const SimpleCurrencyInput = ({ prependSymbol, theme, symbol, ...props }) => {
  const iconWidthClassName = iconOverrideWidthStyles({ symbol });
  const inputPaddingClassName = inputOverridePaddingStyles({
    theme,
    symbol,
    prependSymbol
  });
  return (
    <Input
      className={inputPaddingClassName}
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
      {...props}
      textAlign={prependSymbol ? Input.RIGHT : Input.LEFT}
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
