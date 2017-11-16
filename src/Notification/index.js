import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../util/withStyles';
import styles from './index.scss';

const Notification = ({ type, data }) => (
  <div className={`alert alert--${type}`}>{data.msg}</div>
);

Notification.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object,
  children: PropTypes.any
};

export default withStyles(styles)(Notification);
