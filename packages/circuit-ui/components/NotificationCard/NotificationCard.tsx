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

import { HTMLAttributes, ReactNode } from 'react';
import { css } from '@emotion/react';

import styled, { NoTheme, StyleProps } from '../../styles/styled';
import { shadow } from '../../styles/style-mixins';
import { deprecate } from '../../util/logger';

export interface NotificationCardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A single Notification.
   */
  children: ReactNode;
}

const outerStyles = ({ theme }: StyleProps) => css`
  width: 100%;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.mega};
`;

const NotificationCardOuter = styled('div')<NoTheme>(outerStyles, shadow());

const innerStyles = ({ theme }: StyleProps) => css`
  padding: ${theme.spacings.mega} ${theme.spacings.giga};
`;

const NotificationCardInner = styled('div')(innerStyles);

/**
 * @deprecated
 * NotificationCard displays a persistent Notification.
 */
export const NotificationCard = ({
  children,
  ...props
}: NotificationCardProps): JSX.Element => {
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test'
  ) {
    deprecate(
      'NotificationCard',
      'The NotificationCard component is deprecated.',
      'Use one of the new notification components instead',
      'Refer to the migration guide: https://github.com/sumup-oss/circuit-ui/MIGRATION.md/#from-v4-to-v5',
    );
  }
  return (
    <NotificationCardOuter {...props} aria-live="polite" role="status">
      <NotificationCardInner>{children}</NotificationCardInner>
    </NotificationCardOuter>
  );
};
