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

import {
  createContext,
  useContext,
  ReactNode,
  forwardRef,
  HTMLAttributes,
} from 'react';

import type { AsPropType } from '../../types/prop-types.js';
import { clsx } from '../../styles/clsx.js';

import classes from './Skeleton.module.css';

const SkeletonContext = createContext(false);

export interface SkeletonContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The SkeletonContainer should wrap the entire section that's loading.
   */
  children: ReactNode;
  /**
   * Whether the section content is loading.
   */
  isLoading: boolean;
}

/**
 * The SkeletonContainer wraps a section that's loading. It disables user
 * interactions and signals to screen readers that content is being loaded.
 */
export const SkeletonContainer = forwardRef<
  HTMLDivElement,
  SkeletonContainerProps
>(({ children, className, isLoading, ...props }, ref) => (
  <SkeletonContext.Provider value={isLoading}>
    <div
      {...props}
      className={clsx(classes.container, className)}
      ref={ref}
      aria-busy={isLoading}
      // @ts-expect-error `inert` is a new HTML attribute to prevent user input events in an area.
      // This is a progressive enhancement since few browsers support it yet.
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert
      inert={isLoading ? '' : null}
    >
      {children}
    </div>
  </SkeletonContext.Provider>
));

SkeletonContainer.displayName = 'SkeletonContainer';

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * The content that should be replaced by a skeleton element when it being
   * loaded.
   */
  children: ReactNode;
  /**
   * Whether the skeleton should be circular instead of rectangular.
   * Default: `false`.
   */
  circle?: boolean;
  /**
   * Render the skeleton using any HTML element.
   */
  as?: AsPropType;
}

/**
 * A placeholder for asynchronously loaded content with a subtle loading
 * animation. Only works when wrapped in a SkeletonContainer.
 */
export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(
  ({ children, className, as: Element = 'span', circle, ...props }, ref) => {
    const isLoading = useContext(SkeletonContext);

    if (isLoading) {
      return (
        <Element
          {...props}
          className={clsx(
            classes.base,
            classes.placeholder,
            circle && classes.circle,
            className,
          )}
          ref={ref}
        >
          {children}
        </Element>
      );
    }

    return (
      <Element {...props} className={clsx(classes.base, className)} ref={ref}>
        {children}
      </Element>
    );
  },
);

Skeleton.displayName = 'Skeleton';
