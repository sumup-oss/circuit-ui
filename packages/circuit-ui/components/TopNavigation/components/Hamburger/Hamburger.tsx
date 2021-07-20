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

import { HTMLProps, MouseEvent, KeyboardEvent } from 'react';
import { css } from '@emotion/core';
import { Dispatch as TrackingProps } from '@sumup/collector';

import styled, { StyleProps } from '../../../../styles/styled';
import { focusVisible, hideVisually } from '../../../../styles/style-mixins';
import { useClickEvent } from '../../../../hooks/useClickEvent';

const HAMBURGER_WIDTH = '14px';
const LAYER_HEIGHT = '2px';

type OpenProps = Pick<HamburgerProps, 'isOpen'>;

const buttonBaseStyles = ({ theme }: StyleProps) => css`
  background: ${theme.colors.white};
  outline: none;
  border: none;
  border-right: ${theme.borderWidth.kilo} solid ${theme.colors.n300};
  border-bottom: ${theme.borderWidth.kilo} solid ${theme.colors.n300};
  margin: 0;
  padding: ${theme.spacings.kilo};
  transition: color ${theme.transitions.default},
    background-color ${theme.transitions.default},
    border-color ${theme.transitions.default};

  &:hover {
    cursor: pointer;
    background-color: ${theme.colors.n100};
  }

  ${focusVisible('inset')(theme)};

  ${theme.mq.mega} {
    display: none;
  }
`;

const buttonOpenStyles = ({ theme, isOpen }: StyleProps & OpenProps) =>
  isOpen &&
  css`
    background: ${theme.colors.black};
    border-right: ${theme.borderWidth.kilo} solid ${theme.colors.black};
    border-bottom: ${theme.borderWidth.kilo} solid ${theme.colors.black};

    &:hover {
      background-color: ${theme.colors.n900};
    }
  `;

const Button = styled.button<OpenProps>(buttonBaseStyles, buttonOpenStyles);

const boxStyles = ({ theme }: StyleProps) => css`
  position: relative;
  display: flex;
  justify-content: center;
  width: ${theme.iconSizes.mega};
  height: ${theme.iconSizes.mega};
`;

const Box = styled.span(boxStyles);

const layersBaseStyles = ({ theme }: StyleProps) => css`
  top: 50%;
  width: ${HAMBURGER_WIDTH};

  &,
  &::after,
  &::before {
    background-color: ${theme.colors.black};
    display: block;
    height: ${LAYER_HEIGHT};
    position: absolute;
    transition: width 0.2s ease-out 0.15s, opacity 0.1s ease-in,
      transform 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  &::before,
  &::after {
    top: 0;
    content: '';
  }

  &::before {
    transform: translateY(-4px);
    width: ${HAMBURGER_WIDTH};
  }

  &::after {
    transform: translateY(4px);
    width: ${HAMBURGER_WIDTH};
  }
`;

const layersOpenStyles = ({ theme, isOpen }: StyleProps & OpenProps) =>
  isOpen &&
  css`
    transform: rotate(225deg);

    &,
    &::before,
    &::after {
      background-color: ${theme.colors.white};
      border-radius: 1px;
      transition: width 0.2s ease-out, opacity 0.1s ease-out 0.15s,
        transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0.15s;
      width: ${HAMBURGER_WIDTH};
    }

    &::before {
      opacity: 0;
      transform: translateY(0);
    }

    &::after {
      transform: translateY(0) rotate(-90deg);
    }
  `;

const Layers = styled('span')<OpenProps>(layersBaseStyles, layersOpenStyles);

export interface HamburgerProps extends HTMLProps<HTMLButtonElement> {
  /**
   * Function that's called when the hamburger is clicked.
   */
  onToggle?: (event: MouseEvent | KeyboardEvent) => void;
  /**
   * When open, the hamburger icon transform into a close icon.
   */
  isOpen?: boolean;
  /**
   * Label for the `open` state. Important for accessibility.
   */
  openLabel: string;
  /**
   * Label for the `closed` state. Important for accessibility.
   */
  closedLabel: string;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
}

export function Hamburger({
  isOpen = true,
  onToggle,
  openLabel = 'Close menu',
  closedLabel = 'Open menu',
  tracking = {},
  ...props
}: HamburgerProps): JSX.Element {
  const handleClick = useClickEvent(
    onToggle,
    tracking,
    `hamburger-${isOpen ? 'open' : 'closed'}`,
  );
  const label = isOpen ? openLabel : closedLabel;
  return (
    <Button
      {...props}
      isOpen={isOpen}
      onClick={handleClick}
      type="button"
      title={label}
    >
      <span css={hideVisually}>{label}</span>
      <Box>
        <Layers isOpen={isOpen} />
      </Box>
    </Button>
  );
}
