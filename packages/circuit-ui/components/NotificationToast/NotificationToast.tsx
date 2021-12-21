/**
 * Copyright 2021, SumUp Ltd.
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

import { HTMLAttributes, RefObject, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { Alert, Confirm, Info, Notify } from '@sumup/icons';

import styled, { StyleProps } from '../../styles/styled';
import { useAnimation } from '../../hooks/useAnimation';
import Body from '../Body';
import { TrackingProps } from '../../hooks/useClickEvent';
import CloseButton from '../CloseButton';
import { ClickEvent } from '../../types/events';
import { BaseToastProps, createUseToast } from '../ToastContext';
import { hideVisually } from '../../styles/style-mixins';

const TRANSITION_DURATION = 200;
const DEFAULT_HEIGHT = 'auto';

type Variant = 'info' | 'confirm' | 'notify' | 'alert';

export type NotificationToastProps = HTMLAttributes<HTMLDivElement> &
  BaseToastProps & {
    /**
     * Notification toast variants. Defaults to `info`.
     */
    variant?: Variant;
    /**
     * Notification toast headline to provide information (optional)
     */
    headline?: string;
    /**
     * A body copy to provide notification toast information
     */
    body: string;
    /**
     * Whether the notification toast is visible.
     */
    isVisible: boolean;
    /**
     * Additional data that is dispatched with the tracking event.
     */
    tracking?: TrackingProps;
    /**
     * Close button is always rendered in the top right corner
     * onClose is called when the toast is auto-dismissed or the close button is clicked.
     */
    onClose?: (event: ClickEvent) => void;
    /**
     * A clear and concise description of the icon and the Toast's purpose.
     */
    iconLabel: string;
  };

// TODO: update the design token colors to be info/confirm/alert/notify, then remove this mapping
const colorMap = {
  info: 'p500',
  confirm: 'success',
  alert: 'danger',
  notify: 'warning',
} as const;

const iconMap = {
  info: Info,
  confirm: Confirm,
  alert: Alert,
  notify: Notify,
};

type NotificationToastWrapperProps = HTMLAttributes<HTMLDivElement> & {
  variant: Variant;
};

const toastWrapperStyles = ({
  theme,
  variant,
}: NotificationToastWrapperProps & StyleProps) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  background-color: ${theme.colors.bodyBg};
  padding: ${theme.spacings.kilo} ${theme.spacings.mega};
  border-radius: ${theme.borderRadius.byte};
  border: ${theme.borderWidth.mega} solid ${theme.colors[colorMap[variant]]};
  overflow: hidden;
  transition: opacity 200ms ease-in-out, height 200ms ease-in-out,
    visibility 200ms ease-in-out;
`;

const NotificationToastWrapper = styled('div')<NotificationToastWrapperProps>(
  toastWrapperStyles,
);

const contentStyles = ({ theme }: StyleProps) => css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: ${theme.spacings.peta};
  padding-left: ${theme.spacings.mega};
`;

const Content = styled('div')(contentStyles);

const StyledIcon = styled.span(
  ({ theme, variant }: StyleProps & { variant: Variant }) =>
    css`
      display: block;
      align-self: flex-start;
      flex-grow: 0;
      flex-shrink: 0;
      line-height: 0;
      color: ${theme.colors[colorMap[variant]]};
    `,
);

const closeButtonStyles = ({ theme }: StyleProps) => css`
  flex-grow: 0;
  flex-shrink: 0;
  align-self: flex-start;
  margin-top: -${theme.spacings.bit};
  margin-bottom: -${theme.spacings.bit};
  margin-left: auto;
`;

const StyledCloseButton = styled(CloseButton)(closeButtonStyles);

export function NotificationToast({
  variant = 'info',
  body,
  headline,
  onClose,
  iconLabel,
  isVisible,
  tracking,
  duration, // this is the auto-dismiss duration, not the animation duration. We shouldn't pass it to the wrapper along with ...props
  ...props
}: NotificationToastProps): JSX.Element {
  const contentElement = useRef(null);
  const [isOpen, setOpen] = useState(isVisible);
  const [height, setHeight] = useState(getHeight(contentElement));
  const [, setAnimating] = useAnimation();
  useEffect(() => {
    setAnimating({
      duration: 200,
      onStart: () => {
        setHeight(getHeight(contentElement));
        // Delaying the state update until the next animation frame ensures that
        // the browsers renders the new height before the animation starts.
        window.requestAnimationFrame(() => {
          setOpen(isVisible);
        });
      },
      onEnd: () => {
        setHeight(DEFAULT_HEIGHT);
      },
    });
  }, [isVisible, setAnimating]);

  return (
    <NotificationToastWrapper
      ref={contentElement}
      style={{
        opacity: isOpen ? 1 : 0,
        height: isOpen ? height : 0,
        visibility: isOpen ? 'visible' : 'hidden',
      }}
      variant={variant}
      {...props}
    >
      <StyledIcon as={iconMap[variant]} variant={variant} role="presentation" />
      <span css={hideVisually}>{iconLabel}</span>
      <Content>
        {headline && (
          <Body variant={'highlight'} as="h3" noMargin>
            {headline}
          </Body>
        )}
        <Body noMargin>{body}</Body>
      </Content>

      <StyledCloseButton
        label="-" // We need to pass a label here to prevent CloseButton from throwing an error
        aria-hidden="true"
        size="kilo"
        onClick={onClose}
        tracking={
          tracking
            ? { component: 'notification-close', ...tracking }
            : undefined
        }
        tabIndex={-1}
      />
    </NotificationToastWrapper>
  );
}

NotificationToast.TIMEOUT = TRANSITION_DURATION;

export function getHeight(element: RefObject<HTMLElement>): string {
  if (!element || !element.current) {
    return DEFAULT_HEIGHT;
  }
  return `${element.current.scrollHeight}px`;
}

export const useNotificationToast = createUseToast(NotificationToast);
