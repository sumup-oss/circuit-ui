import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.scss';
import withStyles from '../../../util/withStyles';

const Checkbox = ({
  children,
  id,
  name,
  value,
  disabled,
  onChange,
  checked,
  className
}) => (
  <div
    className={classNames('checkbox', className, {
      'checkbox--disabled': disabled
    })}
  >
    <input
      type="checkbox"
      name={name}
      id={id || name}
      disabled={disabled}
      onChange={onChange}
      value={value}
      checked={checked}
    />
    {children}
  </div>
);

Checkbox.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string
};

export default withStyles(styles)(Checkbox);
