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
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { TrackingElement } from '@sumup/collector';

const baseStyles = () => css`
  label: nav-list;
  height: auto;
  justify-self: flex-start;
  overflow-y: auto;
  width: 100%;
`;

const StyledList = styled('ul')(baseStyles);

const TRACKING_ELEMENT = 'navList';

const NavList = ({ children, ...props }) => (
  <TrackingElement name={TRACKING_ELEMENT}>
    <StyledList {...props}>{children}</StyledList>
  </TrackingElement>
);

NavList.propTypes = {
  /**
   * The children component passed to the Sidebar
   */
  children: PropTypes.node,
};

export default NavList;
