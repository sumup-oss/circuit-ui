import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Input from '../../../Input';
import Label from '../../../Label';

/**
 * A specialized input for the credit card's expiry
 * date.
 */
const ExpiryDateInput = ({ label, id, ...props }) => (
  <Fragment>
    <Label htmlFor={id}>{label}</Label>
    <Input autoComplete="cc-exp" type="tel" {...{ ...props, id }} />
  </Fragment>
);

ExpiryDateInput.propTypes = {
  /**
   * The label to be used (for i18n purposes).
   */
  label: PropTypes.string,
  /**
   * Placeholder for the input.
   */
  placeholder: PropTypes.string,
  /**
   * Id to be used for the input.
   */
  id: PropTypes.string
};

ExpiryDateInput.defaultProps = {
  label: 'Expiry date',
  placeholder: 'MM/YY',
  id: 'cui-cc-expiry'
};

/**
 * @component
 */
export default ExpiryDateInput;
