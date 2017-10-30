import React from 'react';
import PropTypes from 'prop-types';
import RadioButton from '../RadioButton';
import Validations from '../Validations';
import Label from '../Label';
import withForm from '../withForm';

function ValidatedRadioButton({
  field,
  label,
  name,
  id,
  value,
  styleAsOptional,
  form: { onFieldChange, data }
}) {
  const checked = data.values[field] === value;
  const meta = data.meta[field];
  const validations = data.validations[field];
  const labelProps = { id: id || name, validations, styleAsOptional, meta };

  return (
    <Validations field={field}>
      <RadioButton
        name={name}
        id={id}
        checked={checked}
        label={label}
        value={value}
        onChange={onFieldChange(field)}
        meta={meta}
        validations={validations}
      >
        <Label {...labelProps}>{label}</Label>
      </RadioButton>
    </Validations>
  );
}

ValidatedRadioButton.propTypes = {
  field: PropTypes.string.isRequired,
  form: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  styleAsOptional: PropTypes.bool
};

export default withForm(ValidatedRadioButton);
