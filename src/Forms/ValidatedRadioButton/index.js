import React from 'react';
import PropTypes from 'prop-types';
import RadioButton from '../RadioButton';
import Validations from '../Validations';
import withForm from '../withForm';

function ValidatedRadioButton({
  field,
  children,
  label,
  name,
  id,
  value,
  form: { onFieldChange, data },
  ...props
}) {
  const checked = data.values[field] === value;
  return (
    <Validations field={field}>
      <RadioButton
        name={name}
        id={id}
        checked={checked}
        label={label}
        value={value}
        onChange={onFieldChange(field)}
        {...props}
      />
    </Validations>
  );
}

ValidatedRadioButton.propTypes = {
  field: PropTypes.string,
  children: PropTypes.node,
  form: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string
};

export default withForm(ValidatedRadioButton);
