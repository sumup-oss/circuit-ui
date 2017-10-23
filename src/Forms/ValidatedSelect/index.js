import React from 'react';
import PropTypes from 'prop-types';
import Select from '../Select';
import ValidationsAndLabel from '../ValidationsAndLabel';
import withForm from '../withForm';

function ValidatedSelect({
  field,
  name,
  id,
  label,
  children,
  form: { onFieldChange, data },
  ...otherProps
}) {
  const props = { field, label };
  return (
    <ValidationsAndLabel {...props}>
      <Select
        name={name}
        id={id}
        onChange={onFieldChange(field)}
        value={data.values[field]}
        errors={data.errors[field]}
        meta={data.meta[field]}
        validations={data.validations[field]}
        {...otherProps}
      >
        {children}
      </Select>
    </ValidationsAndLabel>
  );
}

ValidatedSelect.propTypes = {
  form: PropTypes.object,
  field: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string
};

export default withForm(ValidatedSelect);
