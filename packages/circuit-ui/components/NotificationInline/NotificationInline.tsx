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
  HTMLAttributes,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { css } from '@emotion/react';
import { Alert, Confirm, Info, NotifyCircle } from '@sumup/icons';

import styled, { StyleProps } from '../../styles/styled';
import { useAnimation } from '../../hooks/useAnimation';
import Body from '../Body';
import { TrackingProps } from '../../hooks/useClickEvent';
import CloseButton from '../CloseButton';
import { hideVisually } from '../../styles/style-mixins';
import Button, { ButtonProps } from '../Button';
import { ClickEvent } from '../../types/events';
import { isString } from '../../util/type-check';
import { getTheme } from '../../styles/theme';
import ThemeContext from '../Theming/ThemeContext';

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
   * The notification's variant. Defaults to `info`.
   */
  variant?: Variant;
  /**
   * An optional headline for structured content. Can be a string (an `h3`
   * heading label) or object containing a label and heading level.
   */
  headline?:
    | string
    | {
        as: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
        label: string;
      };
  /**
   * The notification's body copy.
   */
  body: string;
  /**
   * An optional call-to-action button.
   */
  action?: Action;
  /**
   * Whether the notification is visible.
   */
  isVisible?: boolean;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
  /**
   * A text replacement for the icon in the context of the notification, if its
   * body copy isn't self-explanatory. Defaults to an empty string.
   */
  iconLabel?: string;
};

export type NotificationInlineProps = BaseProps & CloseProps;

const iconMap = {
  info: Info,
  confirm: Confirm,
  alert: Alert,
  notify: NotifyCircle,
};

const inlineWrapperStyles = () => css`
  overflow: hidden;
  will-change: height;
  transition: opacity ${TRANSITION_DURATION}ms ease-in-out,
    height ${TRANSITION_DURATION}ms ease-in-out,
    visibility ${TRANSITION_DURATION}ms ease-in-out;
`;

const NotificationInlineWrapper = styled('div')(inlineWrapperStyles);

type ContentWrapperProps = {
  variant: Variant;
  t: 'light' | 'dark';
};

const contentWrapperStyles = ({
  theme,
  variant,
  t,
}: ContentWrapperProps & StyleProps) => {
  const T = getTheme(t);
  return css`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${T.neutral.background.default.default};
    padding: ${theme.spacings.kilo} ${theme.spacings.mega};
    border-radius: ${theme.borderRadius.byte};
    border: ${theme.borderWidth.mega} solid ${theme.colors[variant]};
  `;
};

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

const IconWrapper = styled.div(
  ({ theme, variant }: StyleProps & { variant: Variant }) =>
    css`
      position: relative;
      align-self: flex-start;
      flex-grow: 0;
      flex-shrink: 0;
      line-height: 0;
      color: ${theme.colors[variant]};
    `,
  // Adds a black background behind the SVG icon to color just the exclamation mark black.
  ({ theme, variant }: StyleProps & { variant: Variant }) =>
    variant === 'notify' &&
    css`
      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 2px;
        left: 2px;
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        background: ${theme.colors.black};
        border-radius: ${theme.borderRadius.circle};
      }

      svg {
        position: relative;
        z-index: 1;
      }
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
  iconLabel = '',
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

  const Icon = iconMap[variant];

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
      <ContentWrapper variant={variant} t={useContext(ThemeContext)}>
        <IconWrapper variant={variant}>
          <Icon role="presentation" />
        </IconWrapper>
        <span css={hideVisually}>{iconLabel}</span>
        <Content>
          {headline && (
            <Body
              variant={'highlight'}
              as={isString(headline) ? 'h3' : headline.as}
              noMargin
            >
              {isString(headline) ? headline : headline.label}
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
