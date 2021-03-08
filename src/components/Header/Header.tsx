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

import React, { forwardRef, Ref, HTMLProps } from 'react';
import { css } from '@emotion/core';

import styled, { StyleProps } from '../../styles/styled';

import Title from './components/Title';

export interface HeaderProps extends HTMLProps<HTMLDivElement> {
  /**
   * The page title for the Header.
   */
  title: string;
  /**
   * If the Header should appear only on
   * mobile screens (useful for when using together with the Sidebar).
   */
  mobileOnly?: boolean;
  /**
   * The child component of Header.
   */
  children?: React.ReactNode;
  /**
   * The ref to the HTML DOM element.
   */
  ref?: Ref<HTMLDivElement>;
}

type HeaderElProps = Pick<HeaderProps, 'mobileOnly'>;

const containerStyles = ({ theme }: StyleProps) => css`
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

const mobileOnlyStyles = ({ theme, mobileOnly }: StyleProps & HeaderElProps) =>
  mobileOnly &&
  css`
    ${theme.mq.giga} {
      display: none;
    }
  `;

const Container = styled('div')<HeaderElProps>(
  mobileOnlyStyles,
  containerStyles,
);

export const Header = forwardRef(
  (
    { title, mobileOnly, children, ...props }: HeaderProps,
    ref: HeaderProps['ref'],
  ) => (
    <Container mobileOnly={mobileOnly} ref={ref} {...props}>
      {children}
      <Title>{title}</Title>
    </Container>
  ),
);

Header.displayName = 'Header';
