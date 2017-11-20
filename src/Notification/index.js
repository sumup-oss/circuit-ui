import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '@storybook/addon-console';
import withStyles from '../../util/withStyles';
import styles from './index.scss';

const Notification = ({ type, msg, children, className, action }) => {
  if (!(msg || children)) return null;
  const content = children || msg;
  const classes = classNames(
    {
      alert: true
    },
    `alert--${type}`,
    className,
    action ? `alert--action` : ''
  );

  return action ? (
    <div
      className={classes}
      onClick={() => {
        action();
      }}
      style={{ cursor: 'pointer' }}
    >
      {content}
    </div>
  ) : (
    <div className={classes}>{content}</div>
  );
};

Notification.propTypes = {
  type: PropTypes.string,
  msg: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  action: PropTypes.func
};

export default withStyles(styles)(Notification);
