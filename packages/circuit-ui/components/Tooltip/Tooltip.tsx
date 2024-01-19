/**
 * Copyright 2024, SumUp Ltd.
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

import { ComponentType, HTMLAttributes, forwardRef, useId } from 'react';

import { clsx } from '../../styles/clsx.js';

import classes from './Tooltip.module.css';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A clear and concise label for the reference component.
   * Interactive content such as buttons or links and rich content such as
   * bold text or headings are not supported.
   */
  label: string;
  /**
   * The focusable element that is labelled by the tooltip.
   */
  component: ComponentType<{
    'aria-describedby'?: string;
    'aria-labelledby'?: string;
    'className'?: string;
  }>;
  /**
   * Whether the tooltip is the main label or a supplemental description of
   * the reference component. Default: 'label'.
   */
  type?: 'label' | 'description';
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    { label, component: Component, type = 'label', className, ...props },
    ref,
  ) => {
    const tooltipId = useId();

    const referenceProps = {
      [type === 'label' ? 'aria-labelledby' : 'aria-describedby']: tooltipId,
    };

    return (
      <div className={classes.parent}>
        <Component {...referenceProps} className={classes.component} />
        <div
          {...props}
          ref={ref}
          id={tooltipId}
          className={clsx(classes.base, className)}
        >
          {label}
        </div>
      </div>
    );
  },
);
