import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../util/withStyles';
import styles from './index.scss';

const Paragraph = ({ children }) => {
  const classes = 'paragraph';
  return <p className={classes}>{children}</p>;
};

Text.propTypes = {
  children: PropTypes.node
};

export default withStyles(styles)(Paragraph);
