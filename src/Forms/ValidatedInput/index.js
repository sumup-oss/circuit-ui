import React from 'react';
import PropTypes from 'prop-types';
import { flow } from 'lodash/fp';
import styles from './index.scss';
import Input from '../Input';
import Validations from '../Validations';
import ValidationsAndLabel from '../ValidationsAndLabel';
import withForm from '../withForm';
import withStyles from '../../../util/withStyles';

function ValidatedInput({
  field,
  children,
  label,
  name,
  id,
  type = 'text',
  form: { onFieldChange, data },
  ...otherProps
}) {
  const props = { field, label };
  const Parent = label === undefined ? Validations : ValidationsAndLabel;

  return (
    <Parent {...props}>
      <div className="input-wrapper">
        <Input
          type={type}
          name={name}
          id={id}
          className="input"
          onChange={onFieldChange(field)}
          value={data.values[field]}
          errors={data.errors[field]}
          meta={data.meta[field]}
          {...otherProps}
        />
        {children}
      </div>
    </Parent>
  );
}

ValidatedInput.propTypes = {
  field: PropTypes.string.isRequired,
  children: PropTypes.node,
  form: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string
};

export default flow(withStyles(styles), withForm)(ValidatedInput);
