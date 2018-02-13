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
 * Icon used in the Message component. Used for styling and alignment
 * purposes only.
 */
const MessageIconContainer = styled('div')(baseStyles);

const MessageIcon = ({ children }) => (
  <MessageIconContainer>{children}</MessageIconContainer>
);

MessageIcon.propTypes = {
  /**
   * Icon
   */
  children: PropTypes.element.isRequired
};

/**
 * @component
 */
export default MessageIcon;
