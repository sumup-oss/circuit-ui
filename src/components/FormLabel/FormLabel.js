import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { standard } from '../../themes';
import { bodyKilo } from '../../styles/style-helpers';

const baseStyles = ({ theme }) => css`
  label: form-label;
  ${bodyKilo({ theme })};
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: ${theme.spacings.bit};
`;

/**
 * FormLabel component for forms.
 */
const FormLabel = styled('label')(baseStyles);

FormLabel.propTypes = {
  /**
   * A Circuit UI theme object. Usually provided by a ThemeProvider.
   */
  theme: PropTypes.object
};

FormLabel.defaultProps = {
  theme: standard
};

/**
 * @component
 */
export default FormLabel;
