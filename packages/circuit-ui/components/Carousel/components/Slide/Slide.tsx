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

import type { HTMLAttributes, ReactNode } from 'react';

import { ANIMATION_DURATION, SLIDE_DIRECTIONS } from '../../constants.js';
import { clsx } from '../../../../styles/clsx.js';

import * as SlideService from './SlideService.js';
import classes from './Slide.module.css';

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
  const isAnimating = Boolean(slideSize.width && shouldAnimate);

  return (
    <div
      style={{
        '--slide-width': dynamicWidth,
        '--slide-stack-order': stackOrder,
        '--slide-transform-x': `${index * 100}%`,
        '--slide-animation-duration': `${animationDuration}ms`,
      }}
      className={classes.base}
      {...props}
    >
      <div
        className={clsx(
          classes.inner,
          isAnimating &&
            slideDirection === SLIDE_DIRECTIONS.FORWARD &&
            classes['animate-in'],
          isAnimating &&
            slideDirection === SLIDE_DIRECTIONS.FORWARD &&
            classes['animate-out'],
        )}
      >
        <div>{children}</div>
      </div>
    </div>
  );
}
