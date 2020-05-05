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

import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import BaseButton from '../../../CloseButton';

const baseStyles = ({ theme }) => css`
  label: sidebar-close-button;
  border-radius: ${theme.borderRadius.circle};
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

const CloseButton = styled(BaseButton)`
  ${baseStyles};
  ${visibleStyles};
`;

CloseButton.propTypes = {
  /**
   * Tells if the CloseButton is visible
   */
  visible: PropTypes.bool
};

export default CloseButton;
