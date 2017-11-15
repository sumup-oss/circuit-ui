import React from 'react';
import PropTypes from 'prop-types';
import Textarea from '../Textarea';
import ValidationsAndLabel from '../ValidationsAndLabel';
import withForm from '../withForm';

const ValidatedTextarea = ({
  field,
  children,
  label,
  name,
  id,
  value,
  form: { onFieldChange },
  ...props
}) => (
  <ValidationsAndLabel field={field} label={label}>
    <Textarea
      name={name}
      id={id}
      value={value}
      onChange={onFieldChange(field)}
      {...props}
    />
  </ValidationsAndLabel>
);

ValidatedTextarea.propTypes = {
  field: PropTypes.string.isRequired,
  children: PropTypes.node,
  form: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string
};

export default withForm(ValidatedTextarea);
