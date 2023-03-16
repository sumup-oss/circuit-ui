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
import { hideVisually } from '../../styles/style-mixins';
import Button, { ButtonProps } from '../Button';
import { ClickEvent } from '../../types/events';
import { isString } from '../../util/type-check';

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
   * @deprecated
   *
   * Use an `onClose` handler to dispatch user interaction events instead.
   */
  tracking?: TrackingProps;
  /**
   * A text replacement for the icon in the context of the notification, if its
   * body copy isn't self-explanatory. Defaults to an empty string.
   */
  iconLabel?: string;
};

export type NotificationInlineProps = BaseProps & CloseProps;

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
};

const contentWrapperStyles = ({
  theme,
  variant,
}: ContentWrapperProps & StyleProps) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--cui-bg-normal);
  padding: ${theme.spacings.kilo} ${theme.spacings.mega};
  border-radius: ${theme.borderRadius.byte};
  border: ${theme.borderWidth.mega} solid var(--cui-border-${colorMap[variant]});
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
    color: var(--cui-fg-normal);
    margin-top: ${theme.spacings.byte};

    &:hover {
      color: var(--cui-fg-normal-hovered);
    }

    &:active,
    &[aria-expanded='true'],
    &[aria-pressed='true'] {
      color: var(--cui-fg-normal-pressed);
    }
  `;

const ActionButton = styled(Button)(actionButtonStyles);

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
      <ContentWrapper variant={variant}>
        <IconWrapper variant={variant}>
          <Icon role="presentation" />
        </IconWrapper>
        <span css={hideVisually}>{iconLabel}</span>
        <Content>
          {headline && (
            <Body
              variant={'highlight'}
              as={isString(headline) ? 'h3' : headline.as}
            >
              {isString(headline) ? headline : headline.label}
            </Body>
          )}
          <Body>{body}</Body>
          {action && (
            <ActionButton {...action} variant="tertiary" size="kilo" />
          )}
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
