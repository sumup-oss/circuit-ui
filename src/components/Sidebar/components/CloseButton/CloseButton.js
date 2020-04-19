/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import { hideVisually } from 'polished';
import { Cross } from '@sumup/icons';

const baseStyles = ({ theme }) => css`
  label: sidebar-close-button;
  cursor: pointer;
  outline: none;
  border: none;
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
  visibility: hidden;
  opacity: 0;
  z-index: ${theme.zIndex.sidebar};
  ${theme.mq.giga} {
    visibility: hidden;
  }
`;

const visibleStyles = ({ visible }) =>
  visible &&
  css`
    label: close-button--visible;
    visibility: visible;
    opacity: 1;
  `;

const FloatingButton = styled.button`
  ${baseStyles};
  ${visibleStyles};
`;

const Label = styled('span')(hideVisually());

const CloseButton = ({ visible, label, onClick, ...props }) => (
  <FloatingButton
    visible={visible}
    onClick={onClick}
    {...props}
    aria-label={label}
  >
    <Cross role="presentation" />
    {label && <Label>{label}</Label>}
  </FloatingButton>
);

CloseButton.propTypes = {
  /**
   * Tells if the CloseButton is visible
   */
  visible: PropTypes.bool,
  /**
   * Accessibility label for the CloseButton
   */
  label: PropTypes.string.isRequired,
  /**
   * A function to handle the the click on the CloseButton
   */
  onClick: PropTypes.func
};

CloseButton.defaultProps = {
  visible: false,
  onClick: null
};

export default CloseButton;
