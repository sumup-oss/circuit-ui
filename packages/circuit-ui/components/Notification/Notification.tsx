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

import { FC, ReactNode } from 'react';
import { css } from '@emotion/react';
import { Confirm, Alert, NotifyTriangle, IconProps } from '@sumup/icons';
import { Theme } from '@sumup/design-tokens';

import { ClickEvent } from '../../types/events';
import styled, { StyleProps } from '../../styles/styled';
import CloseButton, { CloseButtonProps } from '../CloseButton';

type Variant = 'success' | 'error' | 'warning';

export interface NotificationProps {
  variant: Variant;
  children: ReactNode;
  icon?: FC<IconProps>;
  onClose?: (event: ClickEvent) => void;
  closeLabel?: string;
}

const containerStyles = () => css`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const Container = styled('div')(containerStyles);

const contentStyles = () => css`
  width: 100%;
`;

const Content = styled('div')(contentStyles);

const colorMap = {
  success: 'success',
  error: 'danger',
  warning: 'warning',
} as const;

const iconMap = {
  success: Confirm,
  error: Alert,
  warning: NotifyTriangle,
} as const;

const iconStyles = (variant: Variant) => (theme: Theme) =>
  css`
    display: block;
    margin-right: ${theme.spacings.kilo};
    flex-grow: 0;
    flex-shrink: 0;
    line-height: 0;
    color: ${theme.colors[colorMap[variant]]};
  `;

const closeButtonStyles = ({ theme }: StyleProps) => css`
  flex-grow: 0;
  flex-shrink: 0;
  align-self: flex-start;
  margin-top: -${theme.spacings.bit};
  margin-bottom: -${theme.spacings.bit};
  margin-left: ${theme.spacings.kilo};
`;

const StyledCloseButton = styled(CloseButton)<CloseButtonProps>(
  closeButtonStyles,
);

/**
 * A Notification component for alerts, updates and notifications.
 */
export const Notification = ({
  variant,
  icon,
  children,
  onClose,
  closeLabel,
  ...props
}: NotificationProps): JSX.Element => {
  const Icon = icon || iconMap[variant];

  return (
    <Container {...props}>
      {Icon && <Icon css={iconStyles(variant)} size="24" />}

      <Content>{children}</Content>

      {onClose && closeLabel && (
        <StyledCloseButton onClick={onClose} label={closeLabel} size="kilo" />
      )}
    </Container>
  );
};
