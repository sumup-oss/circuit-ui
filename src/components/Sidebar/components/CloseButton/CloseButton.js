import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';

import CloseIcon from './closeIcon.svg';

const baseStyles = ({ theme, visible }) => css`
  label: close-button;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: ${theme.colors.n100};
  position: absolute;
  bottom: ${theme.spacings.mega};
  right: ${theme.spacings.mega};
  transition: opacity 150ms ease-in-out, visibility 150ms ease-in-out;
  visibility: ${visible ? 'visible' : 'hidden'};
  opacity: ${visible ? 1 : 0};
  z-index: 1;
  ${theme.mq.mega`
    visibility: hidden;  
  `};
`;

const FloatingButton = styled('button')(baseStyles);

const CloseButton = ({ visible, onClick }) => (
  <FloatingButton visible={visible} onClick={onClick}>
    <CloseIcon />
  </FloatingButton>
);

CloseButton.propTypes = {
  /**
   * Tells if the CloseButton is visible
   */
  visible: PropTypes.bool,
  /**
   * A function to handle the the click on the CloseButton
   */
  onClick: PropTypes.func
};

export default CloseButton;
