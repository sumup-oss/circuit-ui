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
import styled from '@emotion/styled';
import {
  arrow,
  autoUpdate,
  offset,
  Placement,
  useFloating,
} from '@floating-ui/react-dom';
import { useRef } from 'react';

import { NoTheme, StyleProps } from '../../styles/styled';
import { typography } from '../../styles/style-mixins';

export interface TooltipProps {
  text: string;
  placement?: Placement;
  component: () => JSX.Element;
}

const DEFAULT_PLACEMENT: Placement = 'bottom';

const baseStyles = ({ theme }: StyleProps) => css`
  display: inline-block;
  max-width: 280px;
  min-width: 120px;
  background-color: ${theme.colors.n900};
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.bit};
  padding: ${theme.spacings.byte} ${theme.spacings.kilo};
  z-index: ${theme.zIndex.tooltip};
  transition: opacity 0.3s;
  &::after {
    display: block;
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    border: ${theme.spacings.byte} solid transparent;
  }
`;

const TooltipContainer = styled.div<NoTheme>(baseStyles, typography('two'));

const Arrow = styled.div`
  position: absolute;
  background: #333;
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
`;

export const NewTooltip = ({
  text,
  placement,
  component: Component,
}: TooltipProps) => {
  const arrowRef = useRef(null);
  const {
    x,
    y,
    reference,
    placement: floatingPlacement,
    floating,
    strategy,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(10), arrow({ element: arrowRef })],
  });

  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[(floatingPlacement || DEFAULT_PLACEMENT).split('-')[0]] as Placement;

  return (
    <>
      <div ref={reference}>
        <Component />
      </div>
      <TooltipContainer
        role="tooltip"
        ref={floating}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
        }}
      >
        {text}
        <Arrow
          ref={arrowRef}
          style={{
            left: arrowX != null ? `${arrowX}px` : '',
            top: arrowY != null ? `${arrowY}px` : '',
            right: '',
            bottom: '',
            [staticSide]: '-4px',
          }}
        />
      </TooltipContainer>
    </>
  );
};
