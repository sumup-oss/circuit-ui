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

import { HTMLProps } from 'react';
import { css } from '@emotion/core';
import { Dispatch as TrackingProps } from '@sumup/collector';

import styled, { StyleProps } from '../../styles/styled';
import { IconButton, IconButtonProps } from '../IconButton/IconButton';

export type HamburgerRef = HTMLButtonElement;

export interface HamburgerProps
  extends Omit<IconButtonProps, 'ref' | 'children' | 'label' | 'type'> {
  /**
   * When active, the Hamburger transform into a close button.
   */
  isActive?: boolean;
  /**
   * Label for the 'active' state. Important for accessibility.
   */
  activeLabel: string;
  /**
   * Label for the 'inactive' state. Important for accessibility.
   */
  inactiveLabel: string;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
}

const LAYER_HEIGHT = '2px';
const HAMBURGER_WIDTH = '14px';

const buttonStyles = () => css`
  label: hamburger;
  border: 0;
`;

const Button = styled(IconButton)<IconButtonProps>(buttonStyles);

const boxStyles = ({ theme }: StyleProps) => css`
  label: hamburger__box;
  position: relative;
  display: flex;
  justify-content: center;
  width: ${theme.iconSizes.mega};
  height: ${theme.iconSizes.mega};
`;

const Box = styled.span<HTMLProps<HTMLSpanElement>>(boxStyles);

const layersBaseStyles = () => css`
  label: hamburger__layers;
  top: 50%;
  width: ${HAMBURGER_WIDTH};

  &,
  &::after,
  &::before {
    background-color: currentColor;
    border-radius: 1px;
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

const layersActiveStyles = ({ isActive }: { isActive?: boolean }) =>
  isActive &&
  css`
    label: hamburger__layers--active;
    transform: rotate(225deg);

    &,
    &::before,
    &::after {
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

const Layers = styled('span')<{ isActive?: boolean }>(
  layersBaseStyles,
  layersActiveStyles,
);

/**
 * @deprecated
 *
 * A hamburger button for menus. Now built into the TopNavigation component,
 * use that component instead.
 */
export const Hamburger = ({
  isActive,
  activeLabel = 'Close menu',
  inactiveLabel = 'Open menu',
  tracking = {},
  ...props
}: HamburgerProps): JSX.Element => (
  <Button
    label={isActive ? activeLabel : inactiveLabel}
    {...props}
    tracking={{ component: 'hamburger', ...tracking }}
    type="button"
  >
    <Box>
      <Layers isActive={isActive} />
    </Box>
  </Button>
);
