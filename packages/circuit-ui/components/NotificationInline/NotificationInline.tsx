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
import { hideVisually } from '../../styles/style-mixins';
import Button, { ButtonProps } from '../Button';
import { ClickEvent } from '../../types/events';

const TRANSITION_DURATION = 200;
const DEFAULT_HEIGHT = 'auto';

type Variant = 'info' | 'confirm' | 'notify' | 'alert';

type Action = ButtonProps;

type CloseProps =
  | {
      /**
       * Renders a close button in the top right corner and calls the provided function
       * when the button is clicked.
       */
      onClose: (event: ClickEvent) => void;
      /**
       * Text label for the close button for screen readers.
       * Important for accessibility.
       */
      closeButtonLabel: string;
    }
  | { onClose?: never; closeButtonLabel?: never };

export type BaseProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Notification inline variants. Defaults to `info`.
   */
  variant?: Variant;
  /**
   * Notification inline headline to provide information (optional)
   */
  headline?: string;
  /**
   * A body copy to provide information
   */
  body: string;
  /**
   * An optional call-to-action button.
   */
  action?: Action;
  /**
   * Whether the notification inline is visible.
   */
  isVisible?: boolean;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
  /**
   * A clear and concise description of the icon and the Toast's purpose. If the toast body is self-explanatory pass an empty string.
   */
  iconLabel: string;
};

export type NotificationInlineProps = BaseProps & CloseProps;

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

const inlineWrapperStyles = () => css`
  display: inline-flex;
  overflow: hidden;
  will-change: height;
  transition: opacity ${TRANSITION_DURATION}ms ease-in-out,
    height ${TRANSITION_DURATION}ms ease-in-out,
    visibility ${TRANSITION_DURATION}ms ease-in-out;
`;

const NotificationInlineWrapper = styled('div')(inlineWrapperStyles);

type ContentWrapperProps = {
  variant: Variant;
};

const contentWrapperStyles = ({
  theme,
  variant,
}: ContentWrapperProps & StyleProps) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.bodyBg};
  padding: ${theme.spacings.kilo} ${theme.spacings.mega};
  border-radius: ${theme.borderRadius.byte};
  border: ${theme.borderWidth.mega} solid ${theme.colors[colorMap[variant]]};
`;

const ContentWrapper = styled('div')<ContentWrapperProps>(contentWrapperStyles);

const contentStyles = ({ theme }: StyleProps) => css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: ${theme.spacings.peta};
  padding-left: ${theme.spacings.mega};
`;

const Content = styled('div')(contentStyles);

const actionButtonStyles = ({ theme }: StyleProps & ButtonProps) =>
  css`
    font-weight: bold;
    text-decoration-line: underline;
    color: ${theme.colors.black};
    padding-bottom: calc(${theme.spacings.kilo} - ${theme.borderWidth.kilo});

    &:hover {
      color: ${theme.colors.n800};
    }

    &:active,
    &[aria-expanded='true'],
    &[aria-pressed='true'] {
      color: ${theme.colors.n700};
    }
  `;

const ActionButton = styled(Button)(actionButtonStyles);

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

export function NotificationInline({
  variant = 'info',
  body,
  headline,
  action,
  onClose,
  closeButtonLabel,
  iconLabel,
  isVisible = true,
  tracking,
  ...props
}: NotificationInlineProps): JSX.Element {
  const contentElement = useRef(null);
  const [isOpen, setOpen] = useState(isVisible);
  const [height, setHeight] = useState(getHeight(contentElement));
  const [, setAnimating] = useAnimation();

  useEffect(() => {
    setAnimating({
      duration: TRANSITION_DURATION,
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
    <NotificationInlineWrapper
      ref={contentElement}
      style={{
        opacity: isOpen ? 1 : 0,
        height: isOpen ? height : 0,
        visibility: isOpen ? 'visible' : 'hidden',
      }}
      {...props}
    >
      <ContentWrapper variant={variant}>
        <StyledIcon
          as={iconMap[variant]}
          variant={variant}
          role="presentation"
        />
        <span css={hideVisually}>{iconLabel}</span>
        <Content>
          {headline && (
            <Body variant={'highlight'} as="h3" noMargin>
              {headline}
            </Body>
          )}
          <Body noMargin>{body}</Body>
          {action && <ActionButton {...action} variant={'tertiary'} />}
        </Content>

        {onClose && closeButtonLabel && (
          <StyledCloseButton
            label={closeButtonLabel}
            size="kilo"
            onClick={onClose}
            tracking={
              tracking
                ? { component: 'notification-close', ...tracking }
                : undefined
            }
          />
        )}
      </ContentWrapper>
    </NotificationInlineWrapper>
  );
}

NotificationInline.TIMEOUT = TRANSITION_DURATION;

export function getHeight(element: RefObject<HTMLElement>): string {
  if (!element || !element.current) {
    return DEFAULT_HEIGHT;
  }
  return `${element.current.scrollHeight}px`;
}
