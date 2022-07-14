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
import {
  arrow,
  autoUpdate,
  offset,
  Placement,
  useFloating,
} from '@floating-ui/react-dom';
import { useId, useRef } from 'react';

import styled, { NoTheme, StyleProps } from '../../styles/styled';
import { typography } from '../../styles/style-mixins';

export interface TooltipProps {
  /**
   * The text content of the tooltip.
   */
  text: string;
  /**
   * The placement of the tooltip in relation to the anchored component.
   */
  placement?: Placement;
  children?: JSX.Element;
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

const AnchoredElementWrapper = styled.button`
  display: block;
  border: none;
  background-color: transparent;
  width: 100%;
  padding: 0px;
  & * {
    display: block;
  }
`;

const arrowStyles = ({ theme }: StyleProps) => css`
  position: absolute;
  background-color: ${theme.colors.n900};
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
`;

const Arrow = styled.div(arrowStyles);

export const Tooltip = ({
  text,
  placement,
  children,
  ...props
}: TooltipProps) => {
  const arrowRef = useRef(null);
  const id = useId();
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
    middleware: [offset(10), arrow({ element: arrowRef, padding: 12 })],
  });
  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[(floatingPlacement || DEFAULT_PLACEMENT).split('-')[0]] as Placement;

  return (
    <div>
      <AnchoredElementWrapper aria-labelledby={id} ref={reference}>
        {children}
      </AnchoredElementWrapper>
      <TooltipContainer
        {...props}
        id={id}
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
    </div>
  );
};
