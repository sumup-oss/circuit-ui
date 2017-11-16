import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../../util/withStyles';
import styles from './index.scss';

<<<<<<< HEAD
const FlashAlert = props => {
  const { type, msg, className, children, onDismiss } = props;
  let { show } = props;
  const dismissLabel = props.dismissLabel || 'Hide';
  if (show === undefined) show = true;
  const checkProps = show && type && (children || msg);

  if (!checkProps) return null;

  const content = children || msg;
  const classes = classNames(
    { 'flash-alert': true },
    `flash-alert--${type}`,
    className
  );

  return (
    <div className={classes}>
      <span>{content}</span>
      <span
        style={{ marginLeft: '40px', fontWeight: '600', cursor: 'pointer' }}
        onClick={onDismiss}
      >
        {dismissLabel}
      </span>
    </div>
  );
};
=======
class FlashAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: true
    };
  }

  render() {
    const { type, msg, className, children } = this.props;
    const dismissLabel = this.props.dismissLabel || 'Hide';
    const checkProps = type && (children || msg);

    if (!checkProps || !this.state.shown) return null;

    const content = children || msg;
    const classes = classNames(
      { 'flash-alert': true },
      `flash-alert--${type}`,
      className
    );
    return (
      <div className={classes}>
        <span>{content}</span>
        <span
          style={{ marginLeft: '40px', fontWeight: '600', cursor: 'pointer' }}
          onClick={() => {
            this.setState({ shown: false });
          }}
        >
          {dismissLabel}
        </span>
      </div>
    );
  }
}
>>>>>>> adding hide functionality

FlashAlert.propTypes = {
  type: PropTypes.string,
  msg: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
<<<<<<< HEAD
  dismissLabel: PropTypes.string,
  onDismiss: PropTypes.func
=======
  dismissLabel: PropTypes.string
>>>>>>> adding hide functionality
};

export default withStyles(styles)(FlashAlert);
