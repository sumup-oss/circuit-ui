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

import styled, { StyleProps } from '../../styles/styled.js';
import {
  typography,
  focusVisible,
  hideVisually,
} from '../../styles/style-mixins.js';
import { ReturnType } from '../../types/return-type.js';
import { ClickEvent } from '../../types/events.js';
import { AsPropType, EmotionAsPropType } from '../../types/prop-types.js';
import { useComponents } from '../ComponentsContext/index.js';
import Spinner from '../Spinner/index.js';
import { AccessibilityError } from '../../util/errors.js';

export interface BaseProps {
  'children': ReactNode;
  /**
   * Choose from 3 style variants. Default: 'secondary'.
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
   * Change the color from accent to danger to signal to the user that the action
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
  /**
   * Render the Button using any element.
   */
  'as'?: AsPropType;
}

type LinkElProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>;
type ButtonElProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

export type ButtonProps = BaseProps & LinkElProps & ButtonElProps;

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

const iconStyles = (theme: Theme) => css`
  flex-shrink: 0;
  margin-right: ${theme.spacings.byte};
`;

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

type StyledButtonProps = Pick<
  ButtonProps,
  'variant' | 'destructive' | 'size' | 'stretch'
>;

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
    pointer-events: none;
  }
`;

const primaryStyles = ({
  variant = 'secondary',
  destructive,
}: StyledButtonProps) => {
  if (variant !== 'primary') {
    return null;
  }

  if (destructive) {
    return css`
      background-color: var(--cui-bg-danger-strong);
      border-color: transparent;
      color: var(--cui-fg-on-strong);

      &:hover {
        background-color: var(--cui-bg-danger-strong-hovered);
        border-color: transparent;
        color: var(--cui-fg-on-strong-hovered);
      }

      &:active,
      &[aria-expanded='true'],
      &[aria-pressed='true'] {
        background-color: var(--cui-bg-danger-strong-pressed);
        border-color: transparent;
        color: var(--cui-fg-on-strong-pressed);
      }

      &:disabled,
      &[disabled] {
        background-color: var(--cui-bg-danger-strong-disabled);
        border-color: transparent;
        color: var(--cui-fg-on-strong-disabled);
      }
    `;
  }

  return css`
    background-color: var(--cui-bg-accent-strong);
    border-color: transparent;
    color: var(--cui-fg-on-strong);

    &:hover {
      background-color: var(--cui-bg-accent-strong-hovered);
      border-color: transparent;
      color: var(--cui-fg-on-strong-hovered);
    }

    &:active,
    &[aria-expanded='true'],
    &[aria-pressed='true'] {
      background-color: var(--cui-bg-accent-strong-pressed);
      border-color: transparent;
      color: var(--cui-fg-on-strong-pressed);
    }

    &:disabled,
    &[disabled] {
      background-color: var(--cui-bg-accent-strong-disabled);
      border-color: transparent;
      color: var(--cui-fg-on-strong-disabled);
    }
  `;
};

export const secondaryStyles = ({
  variant = 'secondary',
  destructive,
}: StyledButtonProps) => {
  if (variant !== 'secondary') {
    return null;
  }

  if (destructive) {
    return css`
      background-color: var(--cui-bg-normal);
      border-color: var(--cui-border-danger);
      color: var(--cui-fg-danger);

      &:hover {
        background-color: var(--cui-bg-normal-hovered);
        border-color: var(--cui-border-danger-hovered);
        color: var(--cui-fg-danger-hovered);
      }

      &:active,
      &[aria-expanded='true'],
      &[aria-pressed='true'] {
        background-color: var(--cui-bg-normal-pressed);
        border-color: var(--cui-border-danger-pressed);
        color: var(--cui-fg-danger-pressed);
      }

      &:disabled,
      &[disabled] {
        background-color: var(--cui-bg-normal-disabled);
        border-color: var(--cui-border-danger-disabled);
        color: var(--cui-fg-danger-disabled);
      }
    `;
  }

  return css`
    background-color: var(--cui-bg-normal);
    border-color: var(--cui-border-normal);
    color: var(--cui-fg-normal);

    &:hover {
      background-color: var(--cui-bg-normal-hovered);
      border-color: var(--cui-border-normal-hovered);
      color: var(--cui-fg-normal-hovered);
    }

    &:active,
    &[aria-expanded='true'],
    &[aria-pressed='true'] {
      background-color: var(--cui-bg-normal-pressed);
      border-color: var(--cui-border-normal-pressed);
      color: var(--cui-fg-normal-pressed);
    }

    &:disabled,
    &[disabled] {
      background-color: var(--cui-bg-normal-disabled);
      border-color: var(--cui-border-normal-disabled);
      color: var(--cui-fg-normal-disabled);
    }
  `;
};

export const tertiaryStyles = ({
  variant = 'secondary',
  destructive,
}: StyledButtonProps) => {
  if (variant !== 'tertiary') {
    return null;
  }

  const colorMap = {
    default: {
      idle: 'var(--cui-fg-accent)',
      hovered: 'var(--cui-fg-accent-hovered)',
      pressed: 'var(--cui-fg-accent-pressed)',
      disabled: 'var(--cui-fg-accent-disabled)',
    },
    destructive: {
      idle: 'var(--cui-fg-danger)',
      hovered: 'var(--cui-fg-danger-hovered)',
      pressed: 'var(--cui-fg-danger-pressed)',
      disabled: 'var(--cui-fg-danger-disabled)',
    },
  };

  const colors = destructive ? colorMap.destructive : colorMap.default;

  return css`
    background-color: transparent;
    border-color: transparent;
    color: ${colors.idle};
    padding-left: 0;
    padding-right: 0;

    &:hover {
      color: ${colors.hovered};
      background-color: transparent;
      border-color: transparent;
    }

    &:active,
    &[aria-expanded='true'],
    &[aria-pressed='true'] {
      color: ${colors.pressed};
      background-color: transparent;
      border-color: transparent;
    }

    &:disabled,
    &[disabled] {
      color: ${colors.disabled};
      background-color: transparent;
      border-color: transparent;
    }
  `;
};

const sizeStyles = ({
  theme,
  size = 'giga',
}: StyledButtonProps & StyleProps) => {
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

const stretchStyles = ({ stretch }: StyledButtonProps) =>
  stretch &&
  css`
    width: 100%;
  `;

const loadingStyles = css`
  position: relative;
  overflow: hidden;
`;

const StyledButton = styled('button', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'size',
})<StyledButtonProps>(
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
      as,
      ...props
    }: ButtonProps,
    ref?: BaseProps['ref'],
  ): ReturnType => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      isLoading !== undefined &&
      !loadingLabel
    ) {
      throw new AccessibilityError(
        'Button',
        "The `loadingLabel` prop is missing. Remove the `isLoading` prop if you don't intend to use the Button's loading state.",
      );
    }
    const { Link } = useComponents();
    const linkOrButton = props.href ? Link : 'button';

    return (
      <StyledButton
        {...props}
        {...(loadingLabel &&
          typeof isLoading === 'boolean' && {
            'aria-live': 'polite',
            'aria-busy': isLoading,
          })}
        disabled={disabled || isLoading}
        ref={ref}
        as={(as || linkOrButton) as EmotionAsPropType}
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
