import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { set } from 'lodash/fp';
import Checkbox from '../Checkbox';
import Validations from '../Validations';
import Label from '../Label';
import withForm from '../withForm';
import { isChecked, mergeNewValue } from './service';

class ValidatedCheckbox extends Component {
  onChange = e => {
    const { field, form: { onFieldChange, data } } = this.props;
    const currentValues = data.values[field];
    const newValue = e.target.value;
    const mergedValues = mergeNewValue(currentValues, newValue);
    const newEvent = set('target.value', mergedValues, e);
    onFieldChange(field)(newEvent);
  };

  render() {
    const { field, label, name, id, value, form: { data } } = this.props;
    const checked = isChecked(this.props);
    const meta = data.meta[field];
    const validations = data.validations[field];
    const labelProps = {
      id: id || name,
      validations,
      styleAsOptional: false,
      meta
    };

    return (
      <Validations field={field}>
        <Checkbox
          name={name}
          id={id}
          checked={checked}
          label={label}
          value={value}
          onChange={this.onChange}
          meta={meta}
          validations={validations}
        >
          <Label {...labelProps}>{label}</Label>
        </Checkbox>
      </Validations>
    );
  }
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
