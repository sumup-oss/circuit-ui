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
  HTMLProps,
  ReactNode,
  FC,
  SVGProps,
  MouseEvent,
} from 'react';
import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';
import { Theme } from '@sumup/design-tokens';
import { Dispatch as TrackingProps } from '@sumup/collector';

import styled, { StyleProps } from '../../styles/styled';
import {
  typography,
  disableVisually,
  focusOutline,
} from '../../styles/style-mixins';
import { ReturnType } from '../../types/return-type';
import { useComponents } from '../ComponentsContext';
import { useClickHandler } from '../../hooks/useClickHandler';

export interface BaseProps {
  'children': ReactNode;
  /**
   * Choose from 3 style variants. Default: 'primary'.
   */
  'variant'?: 'primary' | 'secondary' | 'tertiary';
  /**
   * Choose from 2 sizes. Default: 'mega'.
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
   * Additional data that is dispatched with the tracking event.
   */
  'tracking'?: TrackingProps;
  /**
   The ref to the html dom element, it can be an anchor or a button
   */
  'ref'?: Ref<HTMLButtonElement & HTMLAnchorElement>;
  'data-testid'?: string;
}

type LinkElProps = Omit<HTMLProps<HTMLAnchorElement>, 'size'>;
type ButtonElProps = Omit<HTMLProps<HTMLButtonElement>, 'size'>;

export type ButtonProps = BaseProps & LinkElProps & ButtonElProps;

const BORDER_WIDTH = '1px';

const COLOR_MAP = {
  default: {
    default: 'p500',
    hover: 'p700',
    active: 'p900',
  },
  destructive: {
    default: 'danger',
    hover: 'r700',
    active: 'r900',
  },
} as const;

const SECONDARY_COLOR_MAP = {
  default: {
    text: 'black',
    default: 'n500',
    hover: 'n700',
    active: 'n800',
  },
  destructive: {
    text: 'danger',
    default: 'danger',
    hover: 'r700',
    active: 'r900',
  },
} as const;

const baseStyles = ({ theme }: StyleProps) => css`
  label: button;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
  margin: 0;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-weight: ${theme.fontWeight.bold};
  border-width: ${BORDER_WIDTH};
  border-style: solid;
  border-radius: ${theme.borderRadius.pill};
  transition: opacity ${theme.transitions.default},
    color ${theme.transitions.default},
    background-color ${theme.transitions.default},
    border-color ${theme.transitions.default};

  &:focus {
    ${focusOutline({ theme })};
  }

  &:disabled,
  &[disabled] {
    ${disableVisually()};
  }
`;

const primaryStyles = ({
  theme,
  variant = 'secondary',
  destructive,
}: ButtonProps & StyleProps) => {
  if (variant !== 'primary') {
    return null;
  }

  const colors = destructive ? COLOR_MAP.destructive : COLOR_MAP.default;

  return css`
    label: button--primary;
    background-color: ${theme.colors[colors.default]};
    border-color: ${theme.colors[colors.default]};
    color: ${theme.colors.white};

    &:hover {
      background-color: ${theme.colors[colors.hover]};
      border-color: ${theme.colors[colors.hover]};
    }

    &:active {
      background-color: ${theme.colors[colors.active]};
      border-color: ${theme.colors[colors.active]};
    }
  `;
};

const secondaryStyles = ({
  theme,
  variant = 'secondary',
  destructive,
}: ButtonProps & StyleProps) => {
  if (variant !== 'secondary') {
    return null;
  }

  const colors = destructive
    ? SECONDARY_COLOR_MAP.destructive
    : SECONDARY_COLOR_MAP.default;

  return css`
    label: button--secondary;
    background-color: ${theme.colors.white};
    border-color: ${theme.colors[colors.default]};
    color: ${theme.colors[colors.text]};

    &:hover {
      background-color: ${theme.colors.n100};
      border-color: ${theme.colors[colors.hover]};
    }

    &:active {
      background-color: ${theme.colors.n200};
      border-color: ${theme.colors[colors.active]};
    }
  `;
};

const tertiaryStyles = ({
  theme,
  variant = 'secondary',
  destructive,
}: ButtonProps & StyleProps) => {
  if (variant !== 'tertiary') {
    return null;
  }

  const colors = destructive ? COLOR_MAP.destructive : COLOR_MAP.default;

  return css`
    label: button--tertiary;
    background-color: transparent;
    border-color: transparent;
    color: ${theme.colors[colors.default]};
    padding-left: 0;
    padding-right: 0;

    &:hover {
      color: ${theme.colors[colors.hover]};
    }

    &:active {
      color: ${theme.colors[colors.active]};
    }
  `;
};

const sizeStyles = ({ theme, size = 'giga' }: ButtonProps & StyleProps) => {
  const sizeMap = {
    kilo: {
      padding: `${theme.spacings.bit} calc(${theme.spacings.mega} - ${BORDER_WIDTH})`,
    },
    giga: {
      padding: `calc(${theme.spacings.kilo} - ${BORDER_WIDTH}) calc(${theme.spacings.giga} - ${BORDER_WIDTH})`,
    },
  };

  return css({
    label: `button--${size}`,
    ...sizeMap[size],
  });
};

const stretchStyles = ({ stretch }: ButtonProps) =>
  stretch &&
  css`
    label: button--stretch;
    width: 100%;
  `;

const iconStyles = (theme: Theme) => css`
  label: button__icon;
  flex-shrink: 0;
  margin-right: ${theme.spacings.byte};
`;

const StyledButton = styled('button', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'size',
})<ButtonProps>(
  typography('one'),
  baseStyles,
  primaryStyles,
  secondaryStyles,
  sizeStyles,
  tertiaryStyles,
  stretchStyles,
);

/**
 * The Button component enables the user to perform an action or navigate
 * to a different screen.
 */
export const Button = forwardRef(
  (
    { children, icon: Icon, tracking, ...props }: ButtonProps,
    ref?: BaseProps['ref'],
  ): ReturnType => {
    const components = useComponents();

    // Need to typecast here because the StyledButton expects a button-like
    // component for its `as` prop. It's safe to ignore that constraint here.
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const Link = components.Link as any;

    const handleClick = useClickHandler<MouseEvent<any>>(
      props.onClick,
      tracking,
      'button',
    );

    return (
      <StyledButton
        {...props}
        ref={ref}
        as={props.href ? Link : 'button'}
        onClick={handleClick}
      >
        {Icon && <Icon css={iconStyles} role="presentation" />}
        {children}
      </StyledButton>
    );
  },
);

Button.displayName = 'Button';
