import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../../util/withStyles';
import styles from './index.scss';

const SumUpLogo = ({ fill, className, ...otherProps }) => {
  const classes = classNames('su-logo', [`su-logo--${fill}`], className);
  return (
    <svg viewBox="0 0 125 37" className="icon" {...otherProps}>
      <use className={classes} xlinkHref="/svgs/logos.svg#icon-logo-sumup" />
    </svg>
  );
};

SumUpLogo.propTypes = {
  theme: PropTypes.string,
  className: PropTypes.string
};

SumUpLogo.defaultProps = {
  fill: 'dark',
  className: ''
};

const s = withStyles(styles)(SumUpLogo);

export { s as SumUpLogo };
