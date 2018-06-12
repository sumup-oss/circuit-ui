import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { hideVisually } from 'polished';

import { textKilo } from '../../styles/style-helpers';

const accessibleOnlyStyles = ({ accessibleOnly }) =>
  accessibleOnly &&
  css`
    ${hideVisually()};
  `;

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
  ${accessibleOnlyStyles};
`;

Label.propTypes = {
  /**
   * The identifier of the corresponding form element.
   */
  htmlFor: PropTypes.string.isRequired,
  accessibleOnly: PropTypes.bool
};

Label.defaultProps = {
  accessibleOnly: false
};

/**
 * @component
 */
export default Label;
