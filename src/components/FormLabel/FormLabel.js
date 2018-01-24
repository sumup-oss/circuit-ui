import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { textKilo } from '../../styles/style-helpers';

const baseStyles = ({ theme }) => css`
  label: form-label;
  ${textKilo({ theme })};
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: ${theme.spacings.bit};
`;

/**
 * FormLabel component for forms.
 */
const FormLabel = styled('label')(baseStyles);

FormLabel.propTypes = {
  /**
   * The identifier of the corresponding form element.
   */
  htmlFor: PropTypes.string.isRequired
};

/**
 * @component
 */
export default FormLabel;
