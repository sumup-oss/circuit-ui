import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyles from '../../util/withStyles';
import styles from './index.scss';
import { formatNumberParts } from '../../util/numbers';
import { getCurrencyFormat } from '../../util/currency';

const Price = ({ currency, locale, amount, installments, hasDisclaimer }) => {
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

  const showInstallments = installments > 1;
  const ccySymbolClassNames = classNames('price__currency', {
    'price__small-text': prepend && showInstallments
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
  const post = !prepend && ccySymbol;
  const frac = fractional !== '00' && (
    <span className="price__fractional">{`${decimalSep}${fractional}`}</span>
  );

  return (
    <div className="price">
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
      {hasDisclaimer && <span>*</span>}
    </div>
  );
};

Price.propTypes = {
  currency: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  installments: PropTypes.number,
  hasDisclaimer: PropTypes.bool
};

Price.defaultProps = {
  fractionalPrecision: 2,
  installments: 1,
  hasDisclaimer: false
};

export default withStyles(styles)(Price);
