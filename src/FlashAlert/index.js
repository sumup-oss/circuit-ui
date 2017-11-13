import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../../util/withStyles';
import styles from './index.scss';

const FlashAlert = ({ type, msg, className, children }) => {
  if (!(type && (children || msg))) return null;
  const content = children || msg;
  const classes = classNames(
    { 'flash-alert': true },
    `flash-alert--${type}`,
    className
  );
  return (
    <div className={classes}>
      <span>{content}</span>
    </div>
  );
};

FlashAlert.propTypes = {
  type: PropTypes.string,
  msg: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string
};

export default withStyles(styles)(FlashAlert);
