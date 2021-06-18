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

/** @jsx jsx */
import { FC, SVGProps, ReactNode, MouseEvent, KeyboardEvent } from 'react';
import { css, jsx } from '@emotion/core';
import {
  CircleCheckmarkFilled,
  CircleCrossFilled,
  CircleWarningFilled,
} from '@sumup/icons';
import { Theme } from '@sumup/design-tokens';

import styled, { NoTheme, StyleProps } from '../../styles/styled';
import { CloseButton, CloseButtonProps } from '../CloseButton/CloseButton';

type Variant = 'success' | 'error' | 'warning';

export interface NotificationProps {
  variant: Variant;
  children: ReactNode;
  icon?: FC<SVGProps<SVGSVGElement>>;
  onClose?: (event: MouseEvent | KeyboardEvent) => void;
  closeLabel?: string;
}

const containerStyles = () => css`
  label: notification;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const Container = styled('div')<NoTheme>(containerStyles);

const contentStyles = () => css`
  label: notification__content;
  width: 100%;
`;

const Content = styled('div')<NoTheme>(contentStyles);

const colorMap = {
  success: 'success',
  error: 'danger',
  warning: 'warning',
} as const;

const iconMap = {
  success: CircleCheckmarkFilled,
  error: CircleCrossFilled,
  warning: CircleWarningFilled,
} as const;

const iconStyles = (variant: Variant) => (theme: Theme) =>
  css`
    label: notification__icon;
    display: block;
    margin-right: ${theme.spacings.kilo};
    flex-grow: 0;
    flex-shrink: 0;
    line-height: 0;
    color: ${theme.colors[colorMap[variant]]};
  `;

const closeButtonStyles = ({ theme }: StyleProps) => css`
  label: notification__close-button;
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
}: NotificationProps) => {
  const Icon = icon || iconMap[variant];

  return (
    <Container {...props}>
      {Icon && <Icon css={iconStyles(variant)} size="large" />}

      <Content>{children}</Content>

      {onClose && closeLabel && (
        <StyledCloseButton onClick={onClose} label={closeLabel} size="kilo" />
      )}
    </Container>
  );
};
