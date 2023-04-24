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
  MouseEvent,
  KeyboardEvent,
  useState,
  useRef,
  RefObject,
  useEffect,
  HTMLAttributes,
  forwardRef,
} from 'react';
import { css } from '@emotion/react';

import Button, { ButtonProps } from '../Button/index.js';
import styled, { NoTheme, StyleProps } from '../../styles/styled.js';
import { spacing } from '../../styles/style-mixins.js';
import Headline from '../Headline/index.js';
import Body from '../Body/index.js';
import Image, { ImageProps } from '../Image/index.js';
import CloseButton from '../CloseButton/index.js';
import { useAnimation } from '../../hooks/useAnimation/index.js';
import { applyMultipleRefs } from '../../util/refs.js';

type Action = ButtonProps & {
  variant: 'primary' | 'tertiary';
};

type NotificationVariant = 'system' | 'promotional';

const DEFAULT_HEIGHT = 'auto';

type CloseProps =
  | {
      /**
       * Renders a close button in the top right corner and calls the provided
       * function when the button is clicked.
       */
      onClose: (event: MouseEvent | KeyboardEvent) => void;
      /**
       * Text label for the close button for screen readers.
       * Important for accessibility.
       */
      closeButtonLabel: string;
    }
  | { onClose?: never; closeButtonLabel?: never };

interface NotificationImageProps extends ImageProps {
  /**
   * Align the image to one side of its container. Default: `center`.
   */
  align?: 'top' | 'left' | 'bottom' | 'right';
}

interface BaseProps extends Omit<HTMLAttributes<HTMLDivElement>, 'action'> {
  /**
   * Use the `system` variant for system notification use cases, otherwise,
   * use the `promotional` variant for promotional notification use cases.
   */
  variant?: NotificationVariant;
  /**
   * Optional image to communicate message. The image container width is
   * adjustable.
   */
  image?: NotificationImageProps;
  /**
   * Optional notification headline to communicate a message.
   */
  headline?: string;
  /**
   * Optional notification body to communicate a message.
   */
  body?: string;
  /**
   * A notification action to allow users to directly follow up on the
   * communicated content. It can be a `primary` or `tertiary` button.
   */
  action: Action;
  /**
   * Whether the NotificationBanner is visible.
   */
  isVisible?: boolean;
}

export type NotificationBannerProps = BaseProps & CloseProps;

const bannerWrapperStyles = ({
  theme,
  variant,
}: Pick<NotificationBannerProps, 'variant'> & StyleProps) => css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  border-radius: ${theme.borderRadius.mega};
  background-color: ${variant === 'system'
    ? 'var(--cui-bg-accent)'
    : 'var(--cui-bg-subtle)'};
  overflow: hidden;
  transition: opacity 200ms ease-in-out, height 200ms ease-in-out,
    visibility 200ms ease-in-out;
`;

const NotificationBannerWrapper = styled('div')(bannerWrapperStyles);

const contentStyles = ({ theme }: StyleProps) => css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${theme.spacings.giga};
  padding-right: ${theme.spacings.byte};
  max-width: 420px;
`;

const Content = styled('div')(contentStyles);

const headlineStyles = ({ theme }: StyleProps) => css`
  font-size: ${theme.typography.headline.four.fontSize};
  line-height: ${theme.typography.headline.four.lineHeight};

  ${theme.mq.mega} {
    font-size: ${theme.typography.headline.three.fontSize};
    line-height: ${theme.typography.headline.three.lineHeight};
  }
`;

const ResponsiveHeadline = styled(Headline)<NoTheme>(
  headlineStyles,
  spacing({ bottom: 'byte' }),
);

const bodyStyles = ({ theme }: StyleProps) => css`
  font-size: ${theme.typography.body.two.fontSize};
  line-height: ${theme.typography.body.two.lineHeight};

  ${theme.mq.mega} {
    font-size: ${theme.typography.body.one.fontSize};
    line-height: ${theme.typography.body.one.lineHeight};
  }
`;

const ResponsiveBody = styled(Body)<NoTheme>(
  bodyStyles,
  spacing({ bottom: 'byte' }),
);

const buttonStyles = ({ theme, size = 'giga' }: StyleProps & Action) => css`
  padding-top: calc(${theme.spacings.bit} - ${theme.borderWidth.kilo});
  padding-bottom: calc(${theme.spacings.bit} - ${theme.borderWidth.kilo});
  ${theme.mq.mega} {
    padding-top: ${size === 'giga'
      ? `calc(${theme.spacings.kilo} - ${theme.borderWidth.kilo})`
      : `calc(${theme.spacings.bit} - ${theme.borderWidth.kilo})`};

    padding-bottom: ${size === 'giga'
      ? `calc(${theme.spacings.kilo} - ${theme.borderWidth.kilo})`
      : `calc(${theme.spacings.bit} - ${theme.borderWidth.kilo})`};
  }
`;

const ResponsiveButton = styled(Button)(buttonStyles);

const imageStyles = ({
  theme,
  width,
  align,
}: NotificationImageProps & StyleProps) => css`
  border-radius: 0 ${theme.borderRadius.mega} ${theme.borderRadius.mega} 0;
  min-width: 0;
  width: ${width || 200}px;
  height: auto;
  object-fit: contain;
  object-position: ${align || 'center'};
`;

const StyledImage = styled(Image)(imageStyles);

const closeButtonStyles = ({
  theme,
  notificationVariant,
}: StyleProps & {
  notificationVariant: NotificationVariant;
}) => css`
  position: absolute;
  top: ${theme.spacings.byte};
  right: ${theme.spacings.byte};
  background-color: ${notificationVariant === 'system'
    ? 'var(--cui-bg-accent)'
    : 'var(--cui-bg-subtle)'};
`;

const StyledCloseButton = styled(CloseButton)(closeButtonStyles);

/**
 * The NotificationBanner displays a notification with text, a call-to-action,
 * and optionally an image.
 */
export const NotificationBanner = forwardRef<
  HTMLDivElement,
  NotificationBannerProps
>(
  (
    {
      headline,
      body,
      action,
      variant = 'system',
      image,
      onClose,
      closeButtonLabel,
      isVisible = true,
      ...props
    },
    ref,
  ): JSX.Element => {
    const contentElement = useRef<HTMLDivElement>(null);
    const [isOpen, setOpen] = useState(isVisible);
    const [height, setHeight] = useState(getHeight(contentElement));
    const [, setAnimating] = useAnimation();
    useEffect(() => {
      setAnimating({
        duration: 200,
        onStart: () => {
          setHeight(getHeight(contentElement));
          // Delaying the state update until the next animation frame ensures
          // that browsers render the new height before the animation starts.
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
      <NotificationBannerWrapper
        ref={applyMultipleRefs(ref, contentElement)}
        style={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? height : 0,
          visibility: isOpen ? 'visible' : 'hidden',
        }}
        variant={variant}
        {...props}
      >
        <Content>
          <ResponsiveHeadline as="h2">{headline}</ResponsiveHeadline>
          <ResponsiveBody>{body}</ResponsiveBody>
          <ResponsiveButton {...action} />
        </Content>
        {image && image.src && <StyledImage {...image} />}
        {onClose && closeButtonLabel && (
          <StyledCloseButton
            notificationVariant={variant}
            label={closeButtonLabel}
            size="kilo"
            onClick={onClose}
          />
        )}
      </NotificationBannerWrapper>
    );
  },
);

export function getHeight(element: RefObject<HTMLElement>): string {
  if (!element || !element.current) {
    return DEFAULT_HEIGHT;
  }
  return `${element.current.scrollHeight}px`;
}
