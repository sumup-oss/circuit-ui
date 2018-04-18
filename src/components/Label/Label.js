import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { textKilo } from '../../styles/style-helpers';

const baseStyles = ({ theme }) => css`
  label: form-label;
  ${textKilo({ theme })};
  margin-bottom: ${theme.spacings.bit};
  display: block;
`;

/**
 * Label component for forms.
 */
const Label = styled('label')`
  ${baseStyles};
`;

Label.propTypes = {
  /**
   * The identifier of the corresponding form element.
   */
  htmlFor: PropTypes.string.isRequired
};

/**
 * @component
 */
export default Label;
