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
  useContext,
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
import ThemeContext from '../Theming/ThemeContext';
import { getTheme, SemanticTheme } from '../../styles/theme';

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
  't'?: 'light' | 'dark';
}

type LinkElProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>;
type ButtonElProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

export type ButtonProps = BaseProps & LinkElProps & ButtonElProps;

const COLOR_MAP = (T: SemanticTheme) =>
  ({
    default: {
      bg: T.primary.background.default.default,
      bgHover: T.primary.background.default.hover,
      bgActive: T.primary.background.default.active,
      border: T.primary.border.default.default,
      borderHover: T.primary.border.default.hover,
      borderActive: T.primary.border.default.active,
      text: T.neutral.text.inverted.default, // onPrimary?
    },
    destructive: {
      bg: T.alert.background.default.default,
      bgHover: T.alert.background.default.hover,
      bgActive: T.alert.background.default.active,
      border: T.alert.border.default.default,
      borderHover: T.alert.border.default.hover,
      borderActive: T.alert.border.default.active,
      text: T.neutral.text.inverted.default,
    },
  } as const);

const SECONDARY_COLOR_MAP = (T: SemanticTheme) =>
  ({
    default: {
      bg: T.neutral.background.default.default,
      bgHover: T.neutral.background.default.hover,
      bgActive: T.neutral.background.default.active,
      text: T.neutral.text.highlighted.default,
      border: T.neutral.border.default.default,
      borderHover: T.neutral.border.default.hover,
      borderActive: T.neutral.border.default.active,
    },
    destructive: {
      bg: T.neutral.background.default.default, // bgs are the same in default and destructive variants
      bgHover: T.neutral.background.default.hover,
      bgActive: T.neutral.background.default.active,
      text: T.alert.text.default.default,
      border: T.alert.border.default.default,
      borderHover: T.alert.border.default.hover,
      borderActive: T.alert.border.default.hover,
    },
  } as const);

const TERTIARY_COLOR_MAP = (T: SemanticTheme) =>
  ({
    default: {
      text: T.primary.text.default.default,
      textHover: T.primary.text.default.hover,
      textActive: T.primary.text.default.active,
    },
    destructive: {
      text: T.alert.text.default.default,
      textHover: T.alert.text.default.hover,
      textActive: T.alert.text.default.active,
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
  t,
}: ButtonProps) => {
  if (variant !== 'primary') {
    return null;
  }

  const T = getTheme(t);
  const colors = destructive ? COLOR_MAP(T).destructive : COLOR_MAP(T).default;

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
  t,
}: ButtonProps) => {
  if (variant !== 'secondary') {
    return null;
  }

  const T = getTheme(t);
  const colors = destructive
    ? SECONDARY_COLOR_MAP(T).destructive
    : SECONDARY_COLOR_MAP(T).default;

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
  t,
}: ButtonProps) => {
  if (variant !== 'tertiary') {
    return null;
  }

  const T = getTheme(t);
  const colors = destructive
    ? TERTIARY_COLOR_MAP(T).destructive
    : TERTIARY_COLOR_MAP(T).default;

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
        t={useContext(ThemeContext)}
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
