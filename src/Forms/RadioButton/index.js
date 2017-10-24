import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.scss';
import Label from '../Label';
import withStyles from '../../../util/withStyles';

const RadioButton = ({
  name,
  value,
  disabled,
  onChange,
  checked,
  className,
  label,
  meta,
  validations,
  styleAsOptional,
  ...props
}) => (
  <li
    className={classNames('radio-button', className, {
      'radio-button--disabled': disabled
    })}
  >
    <input
      type="radio"
      name={name}
      id={props.id || name}
      disabled={disabled}
      onChange={onChange}
      value={value}
      checked={checked}
      {...props}
    />
    <Label id={name}>{label}</Label>
  </li>
);

RadioButton.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  meta: PropTypes.object,
  validations: PropTypes.object,
  styleAsOptional: PropTypes.bool,
  label: PropTypes.string
};

export default withStyles(styles)(RadioButton);
