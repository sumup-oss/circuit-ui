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

const baseStyles = ({ theme }) => css`
  label: sidebar-backdrop;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${theme.colors.n900};
  transition: opacity ${theme.transitions.default},
    visibility ${theme.transitions.default};
  visibility: hidden;
  opacity: 0;
  z-index: ${theme.zIndex.backdrop};
  ${theme.mq.giga} {
    visibility: hidden;
  }
`;

const visibleStyles = ({ visible }) =>
  visible &&
  css`
    label: sidebar-backdrop--visible;
    visibility: visible;
    opacity: 0.56;
  `;

const Backdrop = styled('div')(baseStyles, visibleStyles);

Backdrop.propTypes = {
  /**
   * The children component passed to the Sidebar
   */
  children: PropTypes.node,
  /**
   * Tells if the Backdrop is visible
   */
  visible: PropTypes.bool,
};

export default Backdrop;
