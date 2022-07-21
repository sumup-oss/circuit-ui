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
import { arrow, offset, Placement, useFloating } from '@floating-ui/react-dom';
import { useEffect, useRef } from 'react';

import styled, { NoTheme, StyleProps } from '../../styles/styled';
import { typography } from '../../styles/style-mixins';
import { uniqueId } from '../../util/id';
import { debouncer } from '../../util/helpers';

const DEFAULT_OFFSET = 10;
const DEFAULT_PLACEMENT: Placement = 'bottom';

export interface TooltipProps {
  /**
   * The text content of the tooltip.
   */
  label: string;
  /**
   * The placement of the tooltip in relation to the anchored component.
   */
  placement?: Placement;
  children?: JSX.Element;
  /**
   * Adjust the tooltip offset
   */
  offset?: Offset;
  /**
   * Adjust the arrow offset
   */
  arrowOffset?: {
    x?: number;
    y?: number;
  };
}

type Offset = number | { mainAxis?: number; crossAxis?: number };

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
  display: inline-block;
  border: none;
  background-color: transparent;
  width: fit-content;
  padding: 0px;
  /* line-height: 0; */
`;

const arrowStyles = ({ theme }: StyleProps) => css`
  position: absolute;
  background-color: ${theme.colors.n900};
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
`;

const Arrow = styled.div(arrowStyles);

const handleOffset = (defaultValue: number, offsetProp?: Offset): Offset => {
  if (!offsetProp) {
    return { mainAxis: defaultValue };
  }
  if (typeof offsetProp === 'number') {
    return { mainAxis: offsetProp + defaultValue };
  }
  return { ...offsetProp, mainAxis: (offsetProp.mainAxis || 0) + defaultValue };
};

export const Tooltip = ({
  label,
  placement = 'bottom',
  offset: customOffset,
  arrowOffset = {},
  children,
  ...props
}: TooltipProps) => {
  const arrowRef = useRef(null);
  const id = uniqueId('tooltip-');
  const offsetValue = handleOffset(DEFAULT_OFFSET, customOffset);
  const {
    x,
    y,
    floating,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    placement: floatingPlacement,
    reference,
    strategy,
    update,
  } = useFloating({
    placement,
    middleware: [
      offset(offsetValue),
      arrow({ element: arrowRef, padding: 12 }),
    ],
  });
  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[(floatingPlacement || DEFAULT_PLACEMENT).split('-')[0]] as Placement;

  useEffect(() => {
    const REFRESH_INTERVAL = 100;
    const debouncedUpdate = debouncer(update, REFRESH_INTERVAL);
    window.addEventListener('resize', debouncedUpdate);
    return () => {
      window.removeEventListener('resize', debouncedUpdate);
    };
  }, [update]);

  return (
    <div>
      <AnchoredElementWrapper
        type="button"
        aria-labelledby={id}
        ref={reference}
      >
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
        {label}
        <Arrow
          ref={arrowRef}
          style={{
            left: arrowX != null ? `${(arrowOffset.x || 0) + arrowX}px` : '',
            top: arrowY != null ? `${(arrowOffset.x || 0) + arrowY}px` : '',
            right: '',
            bottom: '',
            [staticSide]: '-4px',
          }}
        />
      </TooltipContainer>
    </div>
  );
};
