import React from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';
import Validations from '../Validations';
import withForm from '../withForm';

function ValidationsAndLabel({
  children,
  field,
  name,
  id,
  label,
  styleAsOptional,
  form: { data },
  ...props
}) {
  const validationsProps = {
    field,
    ...props
  };

  return (
    <Validations {...validationsProps}>
      <Label
        htmlFor={id}
        validations={data.validations[field]}
        styleAsOptional={styleAsOptional}
        meta={data.meta[field]}
      >
        {label}
      </Label>
      {children}
    </Validations>
  );
}

ValidationsAndLabel.propTypes = {
  form: PropTypes.object,
  field: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  styleAsOptional: PropTypes.bool
};

export default withForm(ValidationsAndLabel);
