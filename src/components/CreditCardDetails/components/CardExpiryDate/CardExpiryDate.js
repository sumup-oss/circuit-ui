import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Input from '../../../Input';
import Label from '../../../Label';

/**
 * Describe your component here.
 */
const CardExpiryDate = ({ label, id, ...props }) => (
  <Fragment>
    <Label htmlFor={id}>{label}</Label>
    <Input {...{ ...props, id }} />
  </Fragment>
);

CardExpiryDate.propTypes = {
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

CardExpiryDate.defaultProps = {
  label: 'Expiry date',
  placeholder: 'MM/YY',
  id: 'cui-cc-expiry'
};

/**
 * @component
 */
export default CardExpiryDate;
