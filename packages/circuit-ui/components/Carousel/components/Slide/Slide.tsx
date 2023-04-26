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

import { HTMLAttributes, ReactNode } from 'react';
import { css, keyframes } from '@emotion/react';

import styled, { StyleProps } from '../../../../styles/styled';
import { ANIMATION_DURATION, SLIDE_DIRECTIONS } from '../../constants';

import * as SlideService from './SlideService';

export interface SlideProps extends HTMLAttributes<HTMLDivElement> {
  /**
   *  Index of a slide in a carousel (required for animation).
   */
  index?: number;
  /**
   * Current active index of a carousel (required for animation).
   */
  step?: number;
  /**
   * Previous active index of a carousel (required for animation).
   */
  prevStep?: number;
  /**
   * Dimensions of a carousel (required for animation).
   */
  slideSize?: {
    width?: number;
    height?: number;
  };
  /**
   * Indicates slide direction of a carousel (required for animation).
   */
  slideDirection?: SLIDE_DIRECTIONS;
  /**
   * Indicates duration of animation between slides (in milliseconds)
   */
  animationDuration?: number;
  /**
   * Content of a slide
   */
  children: ReactNode;
}

const baseStyles = ({
  index,
  stackOrder,
  dynamicWidth,
}: {
  index: number;
  stackOrder: number;
  dynamicWidth: string;
}) => css`
  width: 100%;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: ${dynamicWidth};
  transform: translate3d(${-index * 100}%, 0, 0);
  backface-visibility: hidden;
  position: relative;
  z-index: ${stackOrder};
`;

const Wrapper = styled('div')(baseStyles);

const slideIn = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`;

const slideOut = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

const animationStyles = ({
  theme,
  isAnimating,
  animationDuration,
  animationName,
}: StyleProps & {
  isAnimating: boolean;
  animationDuration: number;
  animationName: string;
}) => css`
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  will-change: width;
  ${isAnimating &&
  css`
    animation-name: ${animationName};
    animation-duration: ${animationDuration}ms;
    animation-fill-mode: forwards;
    animation-timing-function: ${theme.transitions.slow};
  `};
`;
const Inner = styled('div')(animationStyles);

const dynamicWidthStyles = ({ dynamicWidth }: { dynamicWidth: string }) => css`
  width: ${dynamicWidth};
`;
const Content = styled('div')(dynamicWidthStyles);

export function Slide({
  index = 0,
  step = 0,
  prevStep,
  slideSize = {},
  slideDirection,
  animationDuration = ANIMATION_DURATION,
  children,
  ...props
}: SlideProps) {
  const stackOrder = SlideService.getStackOrder(
    index,
    step,
    prevStep,
    slideDirection,
  );
  const shouldAnimate = SlideService.shouldAnimate(
    index,
    step,
    prevStep,
    slideDirection,
  );
  const dynamicWidth = SlideService.getDynamicWidth(slideSize.width);
  const animationName =
    slideDirection === SLIDE_DIRECTIONS.FORWARD ? slideIn : slideOut;

  return (
    <Wrapper
      index={index}
      stackOrder={stackOrder}
      dynamicWidth={dynamicWidth}
      {...props}
    >
      <Inner
        isAnimating={Boolean(slideSize.width && shouldAnimate)}
        animationName={animationName}
        animationDuration={animationDuration}
      >
        <Content dynamicWidth={dynamicWidth}>{children}</Content>
      </Inner>
    </Wrapper>
  );
}
