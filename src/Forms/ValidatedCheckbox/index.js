import React from 'react';
import PropTypes from 'prop-types';
import { set, without, includes } from 'lodash/fp';
import Checkbox from '../Checkbox';
import Validations from '../Validations';
import Label from '../Label';
import withForm from '../withForm';

function ValidatedCheckbox({
  field,
  label,
  name,
  id,
  value,
  styleAsOptional,
  form: { onFieldChange, data }
}) {
  const currentValues = data.values[field];
  const checked = includes(value, currentValues);
  const meta = data.meta[field];
  const validations = data.validations[field];
  const labelProps = { id: id || name, validations, styleAsOptional, meta };

  const onChange = e => {
    const newValue = e.target.value;
    const baseValue = currentValues === '' ? [] : currentValues;
    const containsCurrentValue = includes(newValue, baseValue);
    const newData = containsCurrentValue
      ? without(newValue, currentValues)
      : [newValue, ...currentValues];
    const newEvent = set(newData, 'target.value', e);
    onFieldChange(field)(newEvent);
  };

  return (
    <Validations field={field}>
      <Checkbox
        name={name}
        id={id}
        checked={checked}
        label={label}
        value={value}
        onChange={onChange}
        meta={meta}
        validations={validations}
      >
        <Label {...labelProps}>{label}</Label>
      </Checkbox>
    </Validations>
  );
}

ValidatedCheckbox.propTypes = {
  field: PropTypes.string.isRequired,
  form: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  styleAsOptional: PropTypes.bool
};

export default withForm(ValidatedCheckbox);
