import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../util/withStyles';
import styles from './index.scss';

const FlashAlert = ({ type, data }) => (
  <div className={`flash-alert flash-alert--${type}`}>
    <span>{data.msg}</span>
  </div>
);

FlashAlert.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object,
  children: PropTypes.any
};

export default withStyles(styles)(FlashAlert);
