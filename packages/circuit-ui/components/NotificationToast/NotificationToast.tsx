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

import {
  FC,
  HTMLAttributes,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { css } from '@emotion/react';
import { Alert, Confirm, IconProps, Info, Notify } from '@sumup/icons';

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
     * The toast's variant. Defaults to `info`.
     */
    variant?: Variant;
    /**
     * An optional headline for structured toast content.
     */
    headline?: string;
    /**
     * The toast's body copy.
     */
    body: string;
    /**
     * Whether the notification toast is visible.
     */
    isVisible: boolean;
    /**
     * @deprecated
     *
     * Use an `onClose` handler to dispatch user interaction events instead.
     */
    tracking?: TrackingProps;
    /**
     * An optional callback that is called when the toast is dismissed,
     * manually or after a timeout.
     */
    onClose?: (event: ClickEvent) => void;
    /**
     * A text replacement for the icon in the context of the toast, if its body
     * copy isn't self-explanatory. Defaults to an empty string.
     */
    iconLabel?: string;
  };

const iconMap: Record<Variant, FC<IconProps<'16' | '24'>>> = {
  info: Info,
  confirm: Confirm,
  alert: Alert,
  notify: Notify,
};

// TODO: Align variant names with token names in the next major.
const colorMap: Record<Variant, string> = {
  info: 'accent',
  confirm: 'success',
  alert: 'danger',
  notify: 'warning',
};

type NotificationToastWrapperProps = {
  variant: Variant;
};

const toastWrapperStyles = ({
  theme,
  variant,
}: NotificationToastWrapperProps & StyleProps) => css`
  background-color: var(--cui-bg-elevated);
  border-radius: ${theme.borderRadius.byte};
  border: ${theme.borderWidth.mega} solid var(--cui-border-${colorMap[variant]});
  overflow: hidden;
  will-change: height;
  transition: opacity ${TRANSITION_DURATION}ms ease-in-out,
    height ${TRANSITION_DURATION}ms ease-in-out,
    visibility ${TRANSITION_DURATION}ms ease-in-out;
`;

const NotificationToastWrapper =
  styled('div')<NotificationToastWrapperProps>(toastWrapperStyles);

const contentWrapperStyles = ({ theme }: StyleProps) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacings.kilo} ${theme.spacings.mega};
`;

const ContentWrapper = styled('div')(contentWrapperStyles);

const contentStyles = ({ theme }: StyleProps) => css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: ${theme.spacings.peta};
  padding-left: ${theme.spacings.mega};
`;

const Content = styled('div')(contentStyles);

const IconWrapper = styled.div(
  ({ variant }: { variant: Variant }) =>
    css`
      position: relative;
      align-self: flex-start;
      flex-grow: 0;
      flex-shrink: 0;
      line-height: 0;
      color: var(--cui-fg-${colorMap[variant]});
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
  iconLabel = '',
  isVisible,
  tracking,
  duration, // this is the auto-dismiss duration, not the animation duration. We shouldn't pass it to the wrapper along with ...props
  ...props
}: NotificationToastProps): JSX.Element {
  const contentElement = useRef(null);
  const [isOpen, setOpen] = useState(false);
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

  const Icon = iconMap[variant];

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
      <ContentWrapper>
        <IconWrapper variant={variant}>
          <Icon role="presentation" />
        </IconWrapper>
        <span css={hideVisually}>{iconLabel}</span>
        <Content>
          {headline && (
            <Body variant={'highlight'} as="h3">
              {headline}
            </Body>
          )}
          <Body>{body}</Body>
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
      </ContentWrapper>
    </NotificationToastWrapper>
  );
}

NotificationToast.TRANSITION_DURATION = TRANSITION_DURATION;

export function getHeight(element: RefObject<HTMLElement>): string {
  if (!element || !element.current) {
    return DEFAULT_HEIGHT;
  }
  return `${element.current.scrollHeight}px`;
}

export const useNotificationToast = createUseToast(NotificationToast);
