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

import { HTMLProps, MouseEvent, KeyboardEvent } from 'react';
import { css } from '@emotion/core';
import { Theme } from '@sumup/design-tokens';
import { Dispatch as TrackingProps } from '@sumup/collector';

import Button, { ButtonProps } from '../Button';
import styled, { StyleProps } from '../../styles/styled';
import { shadow, spacing } from '../../styles/style-mixins';
import Headline from '../Headline';
import Body from '../Body';
import Image from '../Image';
import CloseButton from '../CloseButton';

type Action = {
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
  href?: string;
  text: string;
  variant: 'primary' | 'tertiary';
  size: ButtonProps['size'];
};

type CloseProps =
  | {
      /**
       * Renders a close button inside the tag and calls the provided function
       * when the button is clicked.
       */
      onClose: (event: MouseEvent | KeyboardEvent) => void;
      /**
       * Text label for the remove icon for screen readers.
       * Important for accessibility.
       */
      closeButtonLabel: string;
    }
  | { onClose?: never; closeButtonLabel?: never };

interface BaseProps extends Omit<HTMLProps<HTMLDivElement>, 'action'> {
  /**
   * Use the `system` variant for system notification use cases,
   * otherwise, use the `promotional`
   * variant for promotional notification use cases.
   */
  variant?: 'system' | 'promotional';
  /**
   * The source URL of the image.
   */
  src?: string;
  /**
   * Alt text for the image.
   */
  alt?: string;
  /**
   * A notification headline.
   */
  headline?: string;
  /**
   * A notification body.
   */
  body?: string;
  /**
   * A notification action.
   */
  action: Action;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
}

export type NotificationBannerProps = BaseProps & CloseProps;

const bannerWrapperStyles = ({
  theme,
  variant,
}: Pick<NotificationBannerProps, 'variant'> & StyleProps) => css`
  display: flex;
  flex-direction: row;
  position: relative;
  border-radius: ${theme.borderRadius.mega};
  background-color: ${variant === 'system'
    ? theme.colors.p100
    : theme.colors.n100};
  max-width: 420px;
`;

const NotificationBannerWrapper = styled('div')(bannerWrapperStyles, shadow());

const contentStyles = ({ theme }: StyleProps) => css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${theme.spacings.giga} ${theme.spacings.byte} ${theme.spacings.giga}
    ${theme.spacings.giga};
`;

const Content = styled('div')(contentStyles);

const imageStyles = ({ theme }: StyleProps) => css`
  border-radius: 0 ${theme.borderRadius.mega} ${theme.borderRadius.mega} 0;
`;
const StyledImage = styled(Image)(imageStyles);

const closeButtonStyles = (theme: Theme) => css`
  position: absolute;
  background-color: transparent;
  top: ${theme.spacings.byte};
  right: ${theme.spacings.byte};
`;

/**
 * NotificationBanner displays a persistent Notification.
 */
export const NotificationBanner = ({
  headline,
  body,
  action: {
    variant: actionVariant = 'tertiary',
    text,
    onClick,
    href,
    size = 'giga',
  },
  variant = 'system',
  src,
  alt,
  onClose,
  closeButtonLabel,
  tracking,
  ...props
}: NotificationBannerProps): JSX.Element => (
  <NotificationBannerWrapper variant={variant} {...props}>
    <Content>
      <Headline size="three" as="h3" css={spacing({ bottom: 'byte' })}>
        {headline}
      </Headline>
      <Body css={spacing({ bottom: 'byte' })}>{body}</Body>
      <Button
        onClick={onClick}
        variant={actionVariant}
        size={size}
        href={href}
        tracking={{
          label: 'track-button',
          customParameters: { key: 'value' },
        }}
      >
        {text}
      </Button>
    </Content>
    {src && <StyledImage alt={alt || ''} src={src}></StyledImage>}
    {onClose && closeButtonLabel && (
      <CloseButton
        label={closeButtonLabel}
        size="kilo"
        onClick={onClose}
        css={closeButtonStyles}
        tracking={{
          component: 'notification-close',
          ...tracking,
        }}
      />
    )}
  </NotificationBannerWrapper>
);
