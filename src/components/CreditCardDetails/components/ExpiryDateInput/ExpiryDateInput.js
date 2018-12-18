/** @jsx jsx */

import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { jsx } from '@emotion/core';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'; // eslint-disable-line max-len

import MaskedInput from '../../../MaskedInput';
import Label from '../../../Label';

const datePipe = createAutoCorrectedDatePipe('mm/yy');

/**
 * A specialized input for the credit card's expiry
 * date.
 */
const ExpiryDateInput = ({ label, id, ...props }) => (
  <Fragment>
    <Label htmlFor={id}>{label}</Label>
    <MaskedInput
      autoComplete="cc-exp"
      type="tel"
      mask={[/\d/, /\d/, '/', /\d/, /\d/]}
      guide={false}
      keepCharPositions
      pipe={datePipe}
      {...{ ...props, id }}
    />
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
