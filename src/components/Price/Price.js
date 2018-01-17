import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'react-emotion';

import { formatNumberParts } from '../../util/numbers';
import { getCurrencyFormat } from '../../util/currency';
import { standard } from '../../themes';

import { getColorModifier } from './PriceService';

const styles = ({ theme }) => css`
  display: flex;
  font-size: ${theme.fontSize.xxl};
  line-height: 20px;

  @media (min-width: ${theme.breakpoints.big}px) {
    font-size: 30px;
    line-height: ${theme.lineHeight.m};
  }

  &--brand {
    color: ${theme.colors.brand};
  }

  &--highlight {
    color: ${theme.colors.highlight};
  }

  &--success {
    color: ${theme.colors.success};
  }

  &--warning {
    color: ${theme.colors.warning};
  }

  &--error {
    color: ${theme.colors.error};
  }

  &__amount {
    align-items: flex-start;
    display: flex;
  }

  &__amount--prepended-space {
    margin-left: calc(${theme.spacings.xs} / 2);
  }

  &__amount--postpended-space {
    margin-right: calc(${theme.spacings.xs} / 2);
  }

  &__pre {
    display: inline-block;
  }

  &__pre--installments {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__small-text {
    font-size: ${theme.fontSize.xs};
    font-weight: ${theme.fontWeight.medium};
    line-height: ${theme.fontSize.s};

    @include media(min-width: ${theme.breakpoints.big}px) {
      font-size: ${theme.fontSize.s};
    }
  }
`;

const Price = ({ currency, locale, amount, installments, color, theme }) => {
  const {
    decimalSep,
    thousandSep,
    prepend,
    currencyPrecision,
    addSpace,
    symbol
  } = getCurrencyFormat(currency, locale);

  const { integer, fractional } = formatNumberParts(amount, {
    precision: currencyPrecision,
    thousandSep
  });
  const hasFractionalPart = fractional !== '00';
  const showInstallments = installments > 1;

  const baseClassName = styles({ theme });
  const ccySymbolClassNames = cx({
    [`${baseClassName}__small-text`]:
      showInstallments || (!prepend && hasFractionalPart)
  });

  const ccySymbol = <span className={ccySymbolClassNames}>{symbol}</span>;
  const inst = showInstallments && (
    <span
      className={`${baseClassName}__small-text`}
    >{`${installments}\u00D7`}</span>
  );

  const preClassNames = cx(`${baseClassName}__pre`, {
    [`${baseClassName}__pre--installments`]: showInstallments
  });
  const pre = (prepend || showInstallments) && (
    <div className={preClassNames}>
      {inst}
      {prepend && ccySymbol}
    </div>
  );
  const frac = fractional !== '00' && (
    <span
      className={`${baseClassName}__small-text`}
    >{`${decimalSep}${fractional}`}</span>
  );
  const post = !prepend && ccySymbol;

  return (
    <div
      className={cx(
        baseClassName,
        `${baseClassName}${getColorModifier(color)}`
      )}
    >
      {pre}
      <div
        className={cx(`${baseClassName}__amount`, {
          [`${baseClassName}__amount--prepended-space`]: addSpace && prepend,
          [`${baseClassName}__amount--postpended-space`]: addSpace && !prepend
        })}
      >
        <span>{integer}</span>
        {frac}
        {post}
      </div>
    </div>
  );
};

Price.propTypes = {
  currency: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  installments: PropTypes.number,
  color: PropTypes.string,
  theme: PropTypes.object
};

Price.defaultProps = {
  fractionalPrecision: 2,
  installments: 1,
  color: 'brand',
  theme: standard
};

export default Price;
