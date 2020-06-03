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

import React, { HTMLProps, ReactNode, ReactElement, FC, SVGProps } from 'react';
import { css } from '@emotion/core';
import { Theme } from '@sumup/design-tokens';

import styled, { StyleProps } from '../../styles/styled';
import {
  textMega,
  disableVisually,
  focusOutline
} from '../../styles/style-helpers';
import { useComponents } from '../ComponentsContext';

export interface BaseProps {
  children: ReactNode;
  /**
   * Choose from 3 style variants. Default: 'primary'.
   */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /**
   * Choose from 3 sizes. Default: 'mega'.
   */
  size?: 'kilo' | 'mega' | 'giga';
  /**
   * Visually and functionally disable the button.
   */
  disabled?: boolean;
  /**
   * Stretch the button across the full width of its parent.
   */
  stretch?: boolean;
  /**
   * Display an icon in addition to the text to help to identify the action.
   */
  icon?: FC<SVGProps<SVGSVGElement>>;
}

type LinkElProps = Omit<HTMLProps<HTMLAnchorElement>, 'size' | 'type'>;
type ButtonElProps = Omit<HTMLProps<HTMLButtonElement>, 'size' | 'type'>;

export type ButtonProps = BaseProps & LinkElProps & ButtonElProps;

type ReturnType = ReactElement<any, any> | null;

const BORDER_WIDTH = '1px';

const baseStyles = ({ theme }: StyleProps) => css`
  label: button;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
  cursor: pointer;
  ${textMega({ theme })};
  text-align: center;
  text-decoration: none;
  font-weight: ${theme.fontWeight.bold};
  border-radius: ${theme.borderRadius.giga};
  border-width: ${BORDER_WIDTH};
  border-style: solid;
  transition: opacity ${theme.transitions.default};

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
  variant = 'primary'
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
  variant = 'primary'
}: ButtonProps & StyleProps) =>
  variant === 'secondary' &&
  css`
    label: button--secondary;
    background-color: ${theme.colors.white};
    border-color: ${theme.colors.n500};
    color: ${theme.colors.n800};

    &:hover {
      background-color: ${theme.colors.n100};
      border-color: ${theme.colors.n700};
    }

    &:active {
      background-color: ${theme.colors.n200};
      border-color: ${theme.colors.n700};
    }
  `;

const tertiaryStyles = ({
  theme,
  variant = 'primary'
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
    kilo: `${theme.spacings.bit} calc(${theme.spacings.mega} - ${BORDER_WIDTH})`,
    mega: `${theme.spacings.byte} calc(${theme.spacings.giga} - ${BORDER_WIDTH})`,
    giga: `${theme.spacings.kilo} calc(${theme.spacings.tera} - ${BORDER_WIDTH})`
  };

  return css({
    label: `button--${size}`,
    padding: sizeMap[size]
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
  margin-right: ${theme.spacings.byte};
`;

const BaseButton = styled('button')<ButtonProps>(
  baseStyles,
  primaryStyles,
  secondaryStyles,
  tertiaryStyles,
  sizeStyles,
  stretchStyles
);

/**
 * The Button component enables the user to perform an action or navigate
 * to a different screen.
 */
export function Button(props: BaseProps & LinkElProps): ReturnType;
export function Button(props: BaseProps & ButtonElProps): ReturnType;
export function Button({
  children,
  icon: Icon,
  ...props
}: ButtonProps): ReturnType {
  const { Link } = useComponents();
  const LinkButton = BaseButton.withComponent(Link);
  const ButtonElement = props.href ? LinkButton : BaseButton;
  return (
    <ButtonElement {...props}>
      {Icon && <Icon css={iconStyles} role="presentation" />}
      {children}
    </ButtonElement>
  );
}
