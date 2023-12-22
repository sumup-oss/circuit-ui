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

import { HTMLAttributes, useId } from 'react';

import { ReturnType } from '../../types/return-type.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import utilityClasses from '../../styles/utility.js';
import { clsx } from '../../styles/clsx.js';
import { deprecate } from '../../util/logger.js';

import classes from './ProgressBar.module.css';

interface BaseProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @deprecated
   *
   * Choose from 2 style variants. Default: 'primary'.
   */
  variant?: 'primary' | 'secondary';
  /**
   * Choose from 3 sizes. Default: 'm'.
   */
  size?:
    | 's'
    | 'm'
    | 'l'
    /**
     * @deprecated
     */
    | 'byte'
    /**
     * @deprecated
     */
    | 'kilo'
    /**
     * @deprecated
     */
    | 'mega';
  /**
   * A descriptive label that is used by screen readers.
   */
  label: string;
  /**
   * Visually hide the label. This should only be used in rare cases and only
   * if the purpose of the field can be inferred from other context.
   */
  hideLabel?: boolean;
}

interface StepProgressProps {
  /**
   * A number greater than zero, indicating how much work the task requires.
   */
  max?: number;
  /**
   * A number between 0 and max, indicating how much of the task has been
   * completed.
   */
  value?: number;
}

interface TimeProgressProps {
  /**
   * The time it takes the progress bar to fill up in milliseconds.
   */
  duration?: number;
  /**
   * Whether the progress animation should loop indefinitely.
   */
  loop?: boolean;
  /**
   * Whether the animation should the paused.
   */
  paused?: boolean;
}

export type ProgressBarProps = BaseProps &
  StepProgressProps &
  TimeProgressProps;

function getWidth(value = 0, max = 1) {
  const width = value && max ? ((value / max) * 100).toFixed(2) : 0;
  return `${width}%`;
}

const legacySizeMap: Record<string, 's' | 'm' | 'l'> = {
  byte: 's',
  kilo: 'm',
  mega: 'l',
};

/**
 * The ProgressBar component communicates the progress of a task or timer
 * to the user.
 */
export function ProgressBar(props: BaseProps & StepProgressProps): ReturnType;
export function ProgressBar(props: BaseProps & TimeProgressProps): ReturnType;
export function ProgressBar({
  max,
  value,
  size: legacySize = 'm',
  variant: deprecatedVariant,
  duration = 3000,
  loop = false,
  paused = false,
  label,
  hideLabel,
  className,
  ...props
}: ProgressBarProps): ReturnType {
  const ariaId = useId();

  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test' &&
    !isSufficientlyLabelled(label)
  ) {
    throw new AccessibilityError(
      'ProgressBar',
      'The `label` prop is missing or invalid.',
    );
  }

  if (process.env.NODE_ENV !== 'production' && legacySizeMap[legacySize]) {
    deprecate(
      'ProgressBar',
      `The \`${legacySize}\` size has been deprecated. Use the \`${legacySizeMap[legacySize]}\` size instead.`,
    );
  }

  if (process.env.NODE_ENV !== 'production' && deprecatedVariant) {
    deprecate(
      'ProgressBar',
      `The \`${legacySize}\` size has been deprecated. Use the \`${legacySizeMap[legacySize]}\` size instead.`,
    );
  }

  const size = legacySizeMap[legacySize] || legacySize;
  const variant = deprecatedVariant || 'primary';

  return (
    <div className={clsx(classes.wrapper, className)} {...props}>
      {max || value ? (
        <span
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-labelledby={ariaId}
          className={clsx(classes.base, classes[variant], classes[size])}
          style={{ '--pagination-width': getWidth(value, max) }}
        />
      ) : (
        <span
          role="progressbar"
          aria-labelledby={ariaId}
          className={clsx(classes.base, classes[variant], classes[size])}
          data-loop={loop}
          style={{
            '--pagination-animation-duration': `${duration}ms`,
            '--pagination-animation-play-state': paused ? 'paused' : 'running',
          }}
        />
      )}
      <span
        id={ariaId}
        className={clsx(
          classes.label,
          hideLabel && utilityClasses.hideVisually,
        )}
      >
        {label}
      </span>
    </div>
  );
}
