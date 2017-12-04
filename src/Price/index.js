import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyles from '../../util/withStyles';
import { formatNumberParts } from '../../util/numbers';
import { getCurrencyFormat } from '../../util/currency';

import { getColorClass } from './service';
import styles from './index.scss';

const Price = ({ currency, locale, amount, installments, color }) => {
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
  const ccySymbolClassNames = classNames('price__currency', {
    'price__small-text': showInstallments || (!prepend && hasFractionalPart)
  });
  const ccySymbol = <span className={ccySymbolClassNames}>{symbol}</span>;
  const inst = showInstallments && (
    <span className="price__small-text">{`${installments}\u00D7`}</span>
  );

  const preClassNames = classNames('price__pre', {
    'price__pre--installments': showInstallments
  });
  const pre = (prepend || showInstallments) && (
    <div className={preClassNames}>
      {inst}
      {prepend && ccySymbol}
    </div>
  );
  const frac = fractional !== '00' && (
    <span className="price__small-text">{`${decimalSep}${fractional}`}</span>
  );
  const post = !prepend && ccySymbol;

  return (
    <div className={classNames('price', getColorClass(color))}>
      {pre}
      <div
        className={classNames('amount', {
          'amount--prepended-space': addSpace && prepend,
          'amount--postpended-space': addSpace && !prepend
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
  color: PropTypes.string
};

Price.defaultProps = {
  fractionalPrecision: 2,
  installments: 1,
  color: 'brand'
};

export default withStyles(styles)(Price);
