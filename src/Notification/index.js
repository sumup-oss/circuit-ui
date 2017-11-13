import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../../util/withStyles';
import styles from './index.scss';

const Notification = ({ type, msg, children, className }) => {
  if (!(msg || children)) return null;
  const content = children || msg;
  const classes = classNames(
    {
      alert: true
    },
    `alert--${type}`,
    className
  );
  return <div className={classes}>{content}</div>;
};

Notification.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object,
  children: PropTypes.any
};

export default withStyles(styles)(Notification);
