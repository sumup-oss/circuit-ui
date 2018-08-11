import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { hideVisually } from 'polished';

import { textKilo } from '../../styles/style-helpers';

const visuallyHiddenStyles = ({ visuallyHidden }) =>
  visuallyHidden &&
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
const StyledLabel = styled('label')`
  ${baseStyles};
  ${visuallyHiddenStyles};
`;

const Label = props => <StyledLabel {...props} />;

Label.propTypes = {
  /**
   * The identifier of the corresponding form element.
   */
  htmlFor: PropTypes.string.isRequired,
  visuallyHidden: PropTypes.bool
};

StyledLabel.propTypes = Label.propTypes;

Label.defaultProps = {
  visuallyHidden: false
};

/**
 * @component
 */
export default Label;
