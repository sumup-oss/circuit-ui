import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.scss';
import withStyles from '../../../util/withStyles';

const Textarea = ({ disabled, className, name, id, value, ...props }) => (
  <textarea
    name={name}
    id={id}
    disabled={disabled}
    value={value}
    className={classNames('textarea', className)}
    {...props}
  />
);

Textarea.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string
};

export default withStyles(styles)(Textarea);
