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

import { Children, HTMLAttributes, ReactNode } from 'react';
import { css } from '@emotion/react';

import styled, { NoTheme, StyleProps } from '../../styles/styled';
import { shadow } from '../../styles/style-mixins';
import { deprecate } from '../../util/logger';

export interface NotificationListProps
  extends Omit<HTMLAttributes<HTMLUListElement>, 'as'> {
  /**
   * One or more Notifications.
   */
  children: ReactNode;
}

// The first max-width rule is a fallback for old versions of Android
// that don't support calc()
const baseStyles = ({ theme }: StyleProps) => css`
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

const NotificationListWrapper = styled('ul')(baseStyles);

const cardStyles = ({ theme }: StyleProps) => css`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.mega};
  border: ${theme.borderWidth.kilo} solid ${theme.colors.n200};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${theme.spacings.mega} ${theme.spacings.mega};
`;

const NotificationListCard = styled('li')<NoTheme>(cardStyles, shadow());

/**
 * @deprecated
 * NotificationList displays Notifications as Cards in a corner.
 */
export const NotificationList = ({
  children,
  ...props
}: NotificationListProps): JSX.Element => {
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test'
  ) {
    deprecate(
      'NotificationList',
      'The NotificationList component is deprecated.',
      'Use one of the new notification components instead',
      'Refer to the migration guide: https://github.com/sumup-oss/circuit-ui/MIGRATION.md/#from-v4-to-v5',
    );
  }
  return (
    <NotificationListWrapper {...props} aria-live="polite">
      {Children.map(children, (child, i) => (
        <NotificationListCard key={i}>{child}</NotificationListCard>
      ))}
    </NotificationListWrapper>
  );
};
