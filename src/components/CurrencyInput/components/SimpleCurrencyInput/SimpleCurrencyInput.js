/** @jsx jsx */

import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css, ClassNames, jsx } from '@emotion/core';
import { withTheme } from 'emotion-theming';

import { themePropType } from '../../../../util/shared-prop-types';
import MaskedInput from '../../../MaskedInput';

const iconBaseStyles = ({ theme }) => css`
  label: simple-currency-input__symbol;
  color: ${theme.colors.b700};
  line-height: ${theme.spacings.mega};
`;
const iconWarningStyles = ({ theme, hasWarning, disabled }) =>
  !disabled &&
  hasWarning &&
  css`
    label: simple-currency-input__symbol--warning;
    &:not(:focus) {
      color: ${theme.colors.y500};
    }
  `;

const iconInvalidStyles = ({ theme, invalid, disabled }) =>
  !disabled &&
  invalid &&
  css`
    label: simple-currency-input__symbol--error;
    &:not(:focus) {
      color: ${theme.colors.r300};
    }
  `;

// This is dymanic and cannot be done in pure CSS. No need for
// a label.
const iconOverrideWidthStyles = ({ symbol = '' }) => `
  width: ${symbol.length}ch;
`;

const CurrencyIcon = styled('span')`
  ${iconBaseStyles};
  ${iconWarningStyles};
  ${iconInvalidStyles};
`;

const inputStyles = css`
  label: currency-input__input;
  text-align: right;
`;

const inputPrependStyles = ({ theme, symbol = '', prependSymbol, stringCss }) =>
  prependSymbol &&
  stringCss`
    label: currency-input__input--prepend-symbol;
    padding-left: ${theme.spacings.exa};
    padding-left: calc(${theme.spacings.giga} + ${symbol.length}ch);
  `;

const inputAppendStyles = ({ theme, symbol = '', prependSymbol, stringCss }) =>
  !prependSymbol &&
  stringCss`
    label: currency-input__input--prepend-symbol;
    padding-right: ${theme.spacings.exa};
    padding-right: calc(${theme.spacings.giga} + ${symbol.length}ch);
  `;

/**
 * A simple currency input for forms.
 */
const SimpleCurrencyInput = ({
  prependSymbol,
  theme,
  symbol,
  hasWarning,
  invalid,
  disabled,
  numberMask,
  ...props
}) => (
  <ClassNames>
    {({ css: stringCss, cx }) => {
      const inputClassName = cx(
        inputStyles,
        inputPrependStyles({
          theme,
          symbol,
          stringCss,
          prependSymbol
        }),
        inputAppendStyles({
          theme,
          symbol,
          stringCss,
          prependSymbol
        })
      );

      return (
        <MaskedInput
          inputClassName={inputClassName}
          renderPrefix={({ className }) =>
            prependSymbol && (
              <CurrencyIcon
                {...{ hasWarning, invalid, disabled }}
                css={css`
                  ${iconOverrideWidthStyles({ symbol })};
                `}
                className={className}
                symbol={symbol}
              >
                {symbol}
              </CurrencyIcon>
            )
          }
          renderSuffix={({ className }) =>
            !prependSymbol && (
              <CurrencyIcon
                {...{ hasWarning, invalid, disabled }}
                css={css`
                  ${iconOverrideWidthStyles({ symbol })};
                `}
                className={className}
                symbol={symbol}
              >
                {symbol}
              </CurrencyIcon>
            )
          }
          type="text"
          mask={numberMask}
          {...{ ...props, hasWarning, invalid, disabled }}
        />
      );
    }}
  </ClassNames>
);

SimpleCurrencyInput.propTypes = {
  theme: themePropType.isRequired,
  /**
   * Currency symbol to be shown.
   */
  symbol: PropTypes.string.isRequired,
  /**
   * Triggers disabled styles on the component. This is also forwarded as
   * attribute to the <input> element.
   */
  disabled: PropTypes.bool,
  /**
   * A mask function for the MaskedInput. Typically created,
   * via the CurrencyInputService.
   */
  numberMask: PropTypes.func.isRequired,
  /**
   * Triggers error styles on the component. Important for accessibility.
   */
  invalid: PropTypes.bool,
  /**
   * Triggers warning styles on the component.
   */
  hasWarning: PropTypes.bool,
  /**
   * Should the symbol be put on the left side
   * of the input?
   */
  prependSymbol: PropTypes.bool
};

SimpleCurrencyInput.defaultProps = {
  prependSymbol: false,
  disabled: false,
  invalid: false,
  hasWarning: false
};

/**
 * @component
 */
export default withTheme(SimpleCurrencyInput);
