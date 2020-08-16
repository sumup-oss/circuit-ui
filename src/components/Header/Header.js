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

import Title from './components/Title';

const baseStyles = ({ theme }) => css`
  label: header;
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 64px;
  background-color: ${theme.colors.n900};
  padding: ${theme.spacings.mega};
  z-index: ${theme.zIndex.header};
  position: sticky;
`;

const mobileOnlyStyles = ({ theme, mobileOnly }) =>
  mobileOnly &&
  css`
    ${theme.mq.giga} {
      display: none;
    }
  `;

const Container = styled('div')(baseStyles, mobileOnlyStyles);

const Header = ({ title, mobileOnly, children, ...props }) => (
  <Container mobileOnly={mobileOnly} {...props}>
    {children}
    <Title>{title}</Title>
  </Container>
);

Header.propTypes = {
  /**
   * The page title for the Header.
   */
  title: PropTypes.string,
  /**
   * If the Header should appear only on
   * mobile screens (useful for when using together with the Sidebar).
   */
  mobileOnly: PropTypes.bool,
  /**
   * The child component of Header.
   */
  children: PropTypes.node,
};

/**
 * @component
 */
export default Header;
