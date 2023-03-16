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

import { css } from '@emotion/react';

import styled, { StyleProps } from '../../styles/styled';
import { TrackingProps } from '../../hooks/useClickEvent';
import { IconButton, IconButtonProps } from '../IconButton/IconButton';
import { Skeleton } from '../Skeleton';
import { AccessibilityError } from '../../util/errors';

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
   * @deprecated
   *
   * Use an `onClick` handler to dispatch user interaction events instead.
   */
  tracking?: TrackingProps;
  isLoading?: never;
  loadingLabel?: never;
}

const LAYER_HEIGHT = '2px';

const buttonStyles = ({ theme, size }: StyleProps & IconButtonProps) => css`
  border: 0;
  padding: ${size === 'giga' ? theme.spacings.kilo : theme.spacings.byte};
`;

const Button = styled(IconButton)<IconButtonProps>(buttonStyles);

type BoxProps = Required<Pick<HamburgerProps, 'size'>>;

const boxStyles = css`
  position: relative;
  display: flex;
  justify-content: center;
  transform: translateY(-1px);
`;

const boxSizeStyles = ({ theme, size }: StyleProps & BoxProps) => {
  const iconSizeMap = {
    giga: 'mega',
    kilo: 'kilo',
  } as const;
  const iconSize = iconSizeMap[size];

  return css`
    width: ${theme.iconSizes[iconSize]};
    height: ${theme.iconSizes[iconSize]};
  `;
};

const Box = styled(Skeleton)<BoxProps>(boxStyles, boxSizeStyles);

type LayerProps = Required<Pick<HamburgerProps, 'size' | 'isActive'>>;

const widthMap = {
  kilo: '14px',
  giga: '22px',
} as const;

const offsetMap = {
  kilo: '5px',
  giga: '7px',
} as const;

const layersBaseStyles = ({ size }: LayerProps) => {
  const width = widthMap[size];
  const offset = offsetMap[size];

  return css`
    top: 50%;
    width: ${width};

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
      transform: translateY(-${offset});
      width: calc(${width} * 0.64);
    }

    &::after {
      transform: translateY(${offset});
      width: calc(${width} * 0.82);
    }
  `;
};

const layersActiveStyles = ({ isActive, size }: LayerProps) => {
  if (!isActive) {
    return null;
  }

  const width = widthMap[size];

  return css`
    transform: rotate(225deg);

    &,
    &::before,
    &::after {
      transition: width 0.2s ease-out 0.15s, opacity 0.1s ease-out 0.15s,
        transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0.15s;
      width: ${width};
    }

    &::before {
      opacity: 0;
      transform: translateY(0);
    }

    &::after {
      transform: translateY(0) rotate(-90deg);
    }
  `;
};

const Layers = styled('span')<LayerProps>(layersBaseStyles, layersActiveStyles);

/**
 * A hamburger button for menus. Morphs into a close icon when active.
 */
export const Hamburger = ({
  isActive = false,
  activeLabel,
  inactiveLabel,
  size = 'giga',
  tracking,
  ...props
}: HamburgerProps): JSX.Element => {
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test'
  ) {
    if (!activeLabel) {
      throw new AccessibilityError(
        'Hamburger',
        'The `activeLabel` prop is missing.',
      );
    }
    if (!inactiveLabel) {
      throw new AccessibilityError(
        'Hamburger',
        'The `inactiveLabel` prop is missing.',
      );
    }
  }

  return (
    <Button
      {...props}
      size={size}
      label={isActive ? activeLabel : inactiveLabel}
      tracking={tracking ? { component: 'hamburger', ...tracking } : undefined}
      type="button"
    >
      <Box size={size}>
        <Layers isActive={isActive} size={size} />
      </Box>
    </Button>
  );
};
