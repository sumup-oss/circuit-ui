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

import {
  Children,
  forwardRef,
  cloneElement,
  type ReactElement,
  type HTMLAttributes,
} from 'react';

import { clsx } from '../../styles/clsx.js';

import classes from './AspectRatio.module.css';

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactElement;
  aspectRatio?: number;
}

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ aspectRatio, className, style = {}, children, ...props }, ref) => {
    if (!children) {
      return null;
    }

    const child = Children.only(children);

    if (!aspectRatio) {
      return (
        <div ref={ref} className={className} {...props}>
          {child}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={clsx(classes.base, className)}
        style={{
          ...style,
          '--aspect-ratio': `${Math.round((1 / aspectRatio) * 100)}%`,
        }}
        {...props}
      >
        {cloneElement(child, { className: classes.child })}
      </div>
    );
  },
);

AspectRatio.displayName = 'AspectRatio';
