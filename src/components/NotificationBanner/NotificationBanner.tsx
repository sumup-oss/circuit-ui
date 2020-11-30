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

import React, { HTMLProps, ReactNode } from 'react';
import { css } from '@emotion/core';

import styled, { NoTheme, StyleProps } from '../../styles/styled';
import { shadowSingle } from '../../styles/style-helpers';

export interface NotificationBannerProps extends HTMLProps<HTMLDivElement> {
  /**
   * A single Notification.
   */
  children: ReactNode;
}

const outerStyles = ({ theme }: StyleProps) => css`
  label: notification-banner;
  width: 100%;
  background-color: ${theme.colors.white};
  ${shadowSingle({ theme })};
  border-radius: ${theme.borderRadius.mega};
`;

const NotificationBannerOuter = styled('div')<NoTheme>(outerStyles);

const innerStyles = ({ theme }: StyleProps) => css`
  label: notification-banner__inner;
  padding: ${theme.spacings.mega} ${theme.spacings.giga};
`;

const NotificationBannerInner = styled('div')<NoTheme>(innerStyles);

/**
 * NotificationBanner displays a persistent Notification.
 */
export const NotificationBanner = ({
  children,
  ...props
}: NotificationBannerProps) => (
  <NotificationBannerOuter {...props} aria-live="polite" role="status">
    <NotificationBannerInner>{children}</NotificationBannerInner>
  </NotificationBannerOuter>
);
