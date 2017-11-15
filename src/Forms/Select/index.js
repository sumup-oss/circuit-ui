import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.scss';
import withStyles from '../../../util/withStyles';
import { isOptional, getInputClasses } from '../service';

const Select = ({
  name,
  id,
  value,
  autoFocus,
  disabled,
  onChange,
  className,
  errors,
  dirty,
  styleAsOptional,
  validations,
  meta,
  children
}) => {
  const optional = isOptional({ validations, meta, styleAsOptional });
  const selectClassNames = getInputClasses({
    errors,
    dirty,
    disabled,
    className,
    optional
  });

  return (
    <div className="select-custom">
      <select
        name={name}
        id={id}
        value={value}
        className={selectClassNames}
        autoFocus={autoFocus}
        disabled={disabled}
        onChange={onChange}
      >
        {children}
      </select>
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  errors: PropTypes.object,
  dirty: PropTypes.object,
  styleAsOptional: PropTypes.bool,
  validations: PropTypes.object,
  meta: PropTypes.object,
  children: PropTypes.node
};

export default withStyles(styles)(Select);
