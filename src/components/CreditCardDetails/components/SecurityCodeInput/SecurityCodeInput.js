import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Label from '../../../Label';
import Input from '../../../Input';
import { getPlaceholder } from './SecurityCodeInputService';

/**
 * Describe your component here.
 */
const SecurityCodeInput = ({ label, id, cardScheme, ...props }) => (
  <Fragment>
    <Label htmlFor={id}>{label}</Label>
    <Input {...{ ...props, id }} placeholder={getPlaceholder(cardScheme)} />
  </Fragment>
);

SecurityCodeInput.propTypes = {
  /**
   * The label to be used (for i18n purposes).
   */
  label: PropTypes.string,
  /**
   * Id to be used for the input.
   */
  id: PropTypes.string,
  /**
   * The card scheme the code is being entered for. Used
   * to determine whether to show a three or four digit
   * placeholder. The component defaults to a three-digit
   * placeholder.
   */
  cardScheme: PropTypes.string
};

SecurityCodeInput.defaultProps = {
  label: 'Security code',
  id: 'cui-cc-security-code',
  cardScheme: ''
};

/**
 * @component
 */
export default SecurityCodeInput;
