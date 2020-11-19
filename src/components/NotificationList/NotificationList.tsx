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

import React, { Children, HTMLProps, ReactNode } from 'react';
import { css } from '@emotion/core';

import styled, { NoTheme, StyleProps } from '../../styles/styled';
import Card from '../Card';

export interface NotificationListProps extends HTMLProps<HTMLUListElement> {
  /**
   * One or more Notifications.
   */
  children: ReactNode;
}

// The first max-width rule is a fallback for old versions of Android
// that don't support calc()
const baseStyles = ({ theme }: StyleProps) => css`
  label: notification-list;
  display: flex;
  flex-direction: column;
  width: 400px;
  max-width: 90vw;
  max-width: calc(100vw - (${theme.spacings.giga} * 2));

  > * {
    margin-top: ${theme.spacings.mega};
  }

  > *:first-child {
    margin-top: 0;
  }

  ${theme.mq.untilMega} {
    max-width: none;
    width: 100%;
  }
`;

const NotificationListWrapper = styled('ul')<NoTheme>(baseStyles);

// FIXME: Remove typecast once the Card has been migrated to TypeScript.
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const NotificationListCard = Card.withComponent('li') as any;

/**
 * NotificationList displays Notifications as Cards in a corner.
 */
export const NotificationList = ({
  children,
  ...props
}: NotificationListProps) => (
  <NotificationListWrapper {...props} aria-live="polite">
    {Children.map(children, (child, i) => (
      <NotificationListCard spacing="mega" shadow="double" key={i}>
        {child}
      </NotificationListCard>
    ))}
  </NotificationListWrapper>
);
