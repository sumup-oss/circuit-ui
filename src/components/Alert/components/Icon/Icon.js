import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  label: alert__icon;
  display: block;
  margin-right: ${theme.spacings.mega};
  flex-grow: 0;
  flex-shrink: 0;
  line-height: 0;
`;

/**
 * Icon used in the Alert component. Used for styling and alignment
 * purposes only.
 */
const AlertIconContainer = styled('div')(baseStyles);

const AlertIcon = ({ children }) => (
  <AlertIconContainer>{children}</AlertIconContainer>
);

AlertIcon.propTypes = {
  /**
   * Icon
   */
  children: PropTypes.element.isRequired
};

/**
 * @component
 */
export default AlertIcon;
