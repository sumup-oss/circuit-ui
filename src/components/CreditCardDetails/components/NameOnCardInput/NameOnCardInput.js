import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Label from '../../../Label';
import Input from '../../../Input';

/**
 * A conveniance input for the card holder.
 */
const NameOnCardInput = ({ label, id, ...props }) => (
  <Fragment>
    <Label htmlFor={id}>{label}</Label>
    <Input autoComplete="cc-name" type="text" {...{ ...props, id }} />
  </Fragment>
);

NameOnCardInput.propTypes = {
  /**
   * The label to be used (for i18n purposes).
   */
  label: PropTypes.string,
  /**
   * Id to be used for the input.
   */
  id: PropTypes.string
};

NameOnCardInput.defaultProps = {
  label: 'Name on card',
  id: 'cui-cc-name-on-card'
};

/**
 * @component
 */
export default NameOnCardInput;
