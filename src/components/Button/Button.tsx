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

/** @jsx jsx */
import {
  forwardRef,
  Ref,
  HTMLProps,
  ReactNode,
  FC,
  SVGProps,
  MouseEvent,
} from 'react';
import { css, jsx } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';
import { Theme } from '@sumup/design-tokens';
import { Dispatch as TrackingProps } from '@sumup/collector';

import styled, { StyleProps } from '../../styles/styled';
import {
  textMega,
  disableVisually,
  focusOutline,
} from '../../styles/style-helpers';
import { ReturnType } from '../../types/return-type';
import { useComponents } from '../ComponentsContext';
import useClickHandler from '../../hooks/use-click-handler';

export interface BaseProps {
  'children': ReactNode;
  /**
   * Choose from 3 style variants. Default: 'primary'.
   */
  'variant'?: 'primary' | 'secondary' | 'tertiary';
  /**
   * Choose from 2 sizes. Default: 'mega'.
   */
  'size'?: 'kilo' | 'mega';
  /**
   * Visually and functionally disable the button.
   */
  'disabled'?: boolean;
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

const baseStyles = ({ theme }: StyleProps) => css`
  label: button;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
  margin: 0;
  cursor: pointer;
  ${textMega({ theme })};
  text-align: center;
  text-decoration: none;
  font-weight: ${theme.fontWeight.bold};
  border-width: ${BORDER_WIDTH};
  border-style: solid;
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
}: ButtonProps & StyleProps) =>
  variant === 'primary' &&
  css`
    label: button--primary;
    background-color: ${theme.colors.p500};
    border-color: ${theme.colors.p500};
    color: ${theme.colors.white};

    &:hover {
      background-color: ${theme.colors.p700};
      border-color: ${theme.colors.p700};
    }

    &:active {
      background-color: ${theme.colors.p900};
      border-color: ${theme.colors.p900};
    }
  `;

const secondaryStyles = ({
  theme,
  variant = 'secondary',
}: ButtonProps & StyleProps) =>
  variant === 'secondary' &&
  css`
    label: button--secondary;
    background-color: ${theme.colors.white};
    border-color: ${theme.colors.n500};
    color: ${theme.colors.black};

    &:hover {
      background-color: ${theme.colors.n100};
      border-color: ${theme.colors.n700};
    }

    &:active {
      background-color: ${theme.colors.n200};
      border-color: ${theme.colors.n800};
    }
  `;

const tertiaryStyles = ({
  theme,
  variant = 'secondary',
}: ButtonProps & StyleProps) =>
  variant === 'tertiary' &&
  css`
    label: button--tertiary;
    background-color: transparent;
    border-color: transparent;
    color: ${theme.colors.p500};

    &:hover {
      color: ${theme.colors.p700};
    }

    &:active {
      color: ${theme.colors.p900};
    }
  `;

const sizeStyles = ({ theme, size = 'mega' }: ButtonProps & StyleProps) => {
  const sizeMap = {
    kilo: {
      padding: `${theme.spacings.bit} calc(${theme.spacings.mega} - ${BORDER_WIDTH})`,
      borderRadius: theme.borderRadius.giga,
    },
    mega: {
      padding: `${theme.spacings.byte} calc(${theme.spacings.giga} - ${BORDER_WIDTH})`,
      borderRadius: theme.borderRadius.tera,
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
  baseStyles,
  primaryStyles,
  secondaryStyles,
  tertiaryStyles,
  sizeStyles,
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
