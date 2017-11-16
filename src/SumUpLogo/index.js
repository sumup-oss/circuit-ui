import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../util/withStyles';
import styles from './index.scss';

import Logo from './logo-sumup.svg';
import OldLogo from './logo-sumup-old.svg';

const SumUpLogo = ({ fill, type, ...otherProps }) => {
  const toTheme = theme =>
    ({ blue: '#5C8BCC', light: '#EEE', dark: '#1d384c', white: '#fff' }[theme]);
  const props = {
    width: 125,
    height: 37,
    fill: toTheme(fill),
    ...otherProps
  };
  return type === 'old' ? <OldLogo {...props} /> : <Logo {...props} />;
};

SumUpLogo.propTypes = {
  theme: PropTypes.string,
  type: PropTypes.string
};

export default withStyles(styles)(SumUpLogo);
