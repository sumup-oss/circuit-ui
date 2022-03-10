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

import {
  forwardRef,
  Ref,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
  FC,
  SVGProps,
} from 'react';
import { css } from '@emotion/react';
import isPropValid from '@emotion/is-prop-valid';
import { Theme } from '@sumup/design-tokens';

import styled, { StyleProps } from '../../styles/styled';
import {
  typography,
  disableVisually,
  focusVisible,
  hideVisually,
} from '../../styles/style-mixins';
import { ReturnType } from '../../types/return-type';
import { ClickEvent } from '../../types/events';
import { AsPropType } from '../../types/prop-types';
import { useComponents } from '../ComponentsContext';
import { useClickEvent, TrackingProps } from '../../hooks/useClickEvent';
import Spinner from '../Spinner';

export interface BaseProps {
  'children': ReactNode;
  /**
   * Choose from 3 style variants. Default: 'primary'.
   */
  'variant'?: 'primary' | 'secondary' | 'tertiary';
  /**
   * Choose from 2 sizes. Default: 'giga'.
   */
  'size'?: 'kilo' | 'giga';
  /**
   * Visually and functionally disable the button.
   */
  'disabled'?: boolean;
  /**
   * Change the color from blue to red to signal to the user that the action
   * is irreversible or otherwise dangerous.
   */
  'destructive'?: boolean;
  /**
   * Stretch the button across the full width of its parent.
   */
  'stretch'?: boolean;
  /**
   * Display an icon in addition to the text to help to identify the action.
   */
  'icon'?: FC<SVGProps<SVGSVGElement>>;
  /**
   * The HTML button type
   */
  'type'?: 'button' | 'submit' | 'reset' | undefined;
  /**
   * Function that's called when the button is clicked.
   */
  'onClick'?: (event: ClickEvent) => void;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  'tracking'?: TrackingProps;
  /**
   The ref to the HTML DOM element
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  'ref'?: Ref<any>;
  'data-testid'?: string;
  /**
   * Visually disables the button and shows a loading spinner.
   */
  'isLoading'?: boolean;
  /**
   * Visually hidden label to communicate the loading state to visually
   * impaired users.
   */
  'loadingLabel'?: string;
}

type LinkElProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>;
type ButtonElProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

export type ButtonProps = BaseProps & LinkElProps & ButtonElProps;

const COLOR_MAP = (theme: Theme) =>
  ({
    default: {
      bg: theme.colors.background.accent.default.idle,
      bgHover: theme.colors.background.accent.default.hover,
      bgActive: theme.colors.background.accent.default.active,
      border: theme.colors.border.accent.default.idle,
      borderHover: theme.colors.border.accent.default.hover,
      borderActive: theme.colors.border.accent.default.active,
      text: theme.colors.foreground.onAccent.default.idle,
    },
    destructive: {
      bg: theme.colors.background.alert.default.idle,
      bgHover: theme.colors.background.alert.default.hover,
      bgActive: theme.colors.background.alert.default.active,
      border: theme.colors.border.alert.default.idle,
      borderHover: theme.colors.border.alert.default.hover,
      borderActive: theme.colors.border.alert.default.active,
      text: theme.colors.foreground.onAlert.default.idle,
    },
  } as const);

const SECONDARY_COLOR_MAP = (theme: Theme) =>
  ({
    default: {
      bg: theme.colors.background.neutral.default.idle,
      bgHover: theme.colors.background.neutral.default.hover,
      bgActive: theme.colors.background.neutral.default.active,
      border: theme.colors.border.neutral.default.idle,
      borderHover: theme.colors.border.neutral.default.hover,
      borderActive: theme.colors.border.neutral.default.active,
      text: theme.colors.foreground.neutral.highlight.idle,
    },
    destructive: {
      bg: theme.colors.background.neutral.default.idle,
      bgHover: theme.colors.background.neutral.default.hover,
      bgActive: theme.colors.background.neutral.default.active,
      border: theme.colors.border.alert.default.idle,
      borderHover: theme.colors.border.alert.default.hover,
      borderActive: theme.colors.border.alert.default.hover,
      text: theme.colors.foreground.alert.default.idle,
    },
  } as const);

const TERTIARY_COLOR_MAP = (theme: Theme) =>
  ({
    default: {
      text: theme.colors.foreground.accent.default.idle,
      textHover: theme.colors.foreground.accent.default.hover,
      textActive: theme.colors.foreground.accent.default.active,
    },
    destructive: {
      text: theme.colors.foreground.alert.default.idle,
      textHover: theme.colors.foreground.alert.default.hover,
      textActive: theme.colors.foreground.alert.default.active,
    },
  } as const);

const baseStyles = ({ theme }: StyleProps) => css`
  display: inline-flex;
  justify-content: center;
  width: auto;
  height: auto;
  margin: 0;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-weight: ${theme.fontWeight.bold};
  border-width: ${theme.borderWidth.kilo};
  border-style: solid;
  border-radius: ${theme.borderRadius.pill};
  transition: opacity ${theme.transitions.default},
    color ${theme.transitions.default},
    background-color ${theme.transitions.default},
    border-color ${theme.transitions.default};

  &:disabled,
  &[disabled] {
    ${disableVisually()};
  }
`;

const primaryStyles = ({
  variant = 'secondary',
  destructive,
  theme,
}: ButtonProps & StyleProps) => {
  if (variant !== 'primary') {
    return null;
  }

  const colors = destructive
    ? COLOR_MAP(theme).destructive
    : COLOR_MAP(theme).default;

  return css`
    background-color: ${colors.bg};
    border-color: ${colors.border};
    color: ${colors.text};

    &:hover {
      background-color: ${colors.bgHover};
      border-color: ${colors.borderHover};
    }

    &:active,
    &[aria-expanded='true'],
    &[aria-pressed='true'] {
      background-color: ${colors.bgActive};
      border-color: ${colors.borderActive};
    }
  `;
};

const secondaryStyles = ({
  variant = 'secondary',
  destructive,
  theme,
}: ButtonProps & StyleProps) => {
  if (variant !== 'secondary') {
    return null;
  }

  const colors = destructive
    ? SECONDARY_COLOR_MAP(theme).destructive
    : SECONDARY_COLOR_MAP(theme).default;

  return css`
    background-color: ${colors.bg};
    border-color: ${colors.border};
    color: ${colors.text};

    &:hover {
      background-color: ${colors.bgHover};
      border-color: ${colors.borderHover};
    }

    &:active,
    &[aria-expanded='true'],
    &[aria-pressed='true'] {
      background-color: ${colors.bgActive};
      border-color: ${colors.borderActive};
    }
  `;
};

const tertiaryStyles = ({
  variant = 'secondary',
  destructive,
  theme,
}: ButtonProps & StyleProps) => {
  if (variant !== 'tertiary') {
    return null;
  }

  const colors = destructive
    ? TERTIARY_COLOR_MAP(theme).destructive
    : TERTIARY_COLOR_MAP(theme).default;

  return css`
    background-color: transparent;
    border-color: transparent;
    color: ${colors.text};
    padding-left: 0;
    padding-right: 0;

    &:hover {
      color: ${colors.textHover};
    }

    &:active,
    &[aria-expanded='true'],
    &[aria-pressed='true'] {
      color: ${colors.textActive};
    }
  `;
};

const sizeStyles = ({ theme, size = 'giga' }: ButtonProps & StyleProps) => {
  const sizeMap = {
    kilo: {
      padding: `calc(${theme.spacings.bit} - ${theme.borderWidth.kilo}) calc(${theme.spacings.mega} - ${theme.borderWidth.kilo})`,
    },
    giga: {
      padding: `calc(${theme.spacings.kilo} - ${theme.borderWidth.kilo}) calc(${theme.spacings.giga} - ${theme.borderWidth.kilo})`,
    },
  };

  return css({
    ...sizeMap[size],
  });
};

const stretchStyles = ({ stretch }: ButtonProps) =>
  stretch &&
  css`
    width: 100%;
  `;

const iconStyles = (theme: Theme) => css`
  flex-shrink: 0;
  margin-right: ${theme.spacings.byte};
`;

const loadingStyles = css`
  position: relative;
  overflow: hidden;
`;

const spinnerBaseStyles = ({ theme }: StyleProps) => css`
  position: absolute;
  opacity: 0;
  visibility: hidden;
  transition: opacity ${theme.transitions.default},
    visibility ${theme.transitions.default};
`;

const spinnerLoadingStyles = ({ isLoading }: { isLoading: boolean }) =>
  isLoading &&
  css`
    opacity: 1;
    visibility: inherit;
  `;

const LoadingIcon = styled(Spinner)<{ isLoading: boolean }>(
  spinnerBaseStyles,
  spinnerLoadingStyles,
);

const LoadingLabel = styled.span(hideVisually);

const contentStyles = ({ theme }: StyleProps) => css`
  display: inline-flex;
  align-items: center;
  opacity: 1;
  visibility: inherit;
  transform: scale3d(1, 1, 1);
  transition: opacity ${theme.transitions.default},
    transform ${theme.transitions.default},
    visibility ${theme.transitions.default};
`;

const contentLoadingStyles = ({ isLoading }: { isLoading: boolean }) =>
  isLoading &&
  css`
    opacity: 0;
    visibility: hidden;
    transform: scale3d(0, 0, 0);
  `;

const Content = styled.span<{ isLoading: boolean }>(
  contentStyles,
  contentLoadingStyles,
);

const StyledButton = styled('button', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'size',
})<ButtonProps>(
  typography('one'),
  focusVisible,
  baseStyles,
  primaryStyles,
  secondaryStyles,
  sizeStyles,
  tertiaryStyles,
  stretchStyles,
  loadingStyles,
);

/**
 * The Button component enables the user to perform an action or navigate
 * to a different screen.
 */
export const Button = forwardRef(
  (
    {
      children,
      disabled,
      isLoading,
      loadingLabel,
      icon: Icon,
      tracking,
      ...props
    }: ButtonProps,
    ref?: BaseProps['ref'],
  ): ReturnType => {
    if (
      process.env.UNSAFE_DISABLE_ACCESSIBILITY_ERRORS !== 'true' &&
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      isLoading !== undefined &&
      !loadingLabel
    ) {
      throw new Error(
        'The Button component has `isLoading` but is missing a `loadingLabel` prop. This is an accessibility requirement.',
      );
    }
    const components = useComponents();
    const Link = components.Link as AsPropType;

    const handleClick = useClickEvent(props.onClick, tracking, 'button');

    return (
      <StyledButton
        {...props}
        {...(loadingLabel && {
          'aria-live': 'polite',
          'aria-busy': isLoading,
        })}
        disabled={disabled || isLoading}
        ref={ref}
        as={props.href ? Link : 'button'}
        onClick={handleClick}
      >
        <LoadingIcon isLoading={Boolean(isLoading)} size="byte">
          <LoadingLabel>{loadingLabel}</LoadingLabel>
        </LoadingIcon>
        <Content isLoading={Boolean(isLoading)}>
          {Icon && <Icon css={iconStyles} role="presentation" />}
          {children}
        </Content>
      </StyledButton>
    );
  },
);

Button.displayName = 'Button';
