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

import { useId } from 'react';
import { css, keyframes } from '@emotion/react';

import styled, { StyleProps } from '../../styles/styled.js';
import { typography, hideVisually } from '../../styles/style-mixins.js';
import { ReturnType } from '../../types/return-type.js';
import { AccessibilityError } from '../../util/errors.js';

interface BaseProps {
  /**
   * Choose from 2 style variants. Default: 'primary'.
   */
  variant?: 'primary' | 'secondary';
  /**
   * Choose from 3 sizes. Default: 'kilo'.
   */
  size?: 'byte' | 'kilo' | 'mega';
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

type TaskProgressElProps = Omit<BaseProps, 'label'> & StepProgressProps;
type TimeProgressElProps = Omit<BaseProps, 'label'> & TimeProgressProps;
type LabelElProps = Pick<BaseProps, 'hideLabel'>;

const wrapperStyles = () => css`
  display: flex;
  align-items: center;
`;

const ProgressBarWrapper = styled('div')(wrapperStyles);

const baseStyles = ({ theme }: StyleProps) => css`
  background-color: var(--cui-bg-highlight);
  border-radius: ${theme.borderRadius.pill};
  position: relative;
  width: 100%;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: var(--cui-bg-accent-strong);
    transition: width 0.05s ease-out;
    height: 100%;
    width: 1px;
  }
`;

const taskStyles = ({ value = 0, max = 1 }: StepProgressProps) => {
  const width = value && max ? (value / max) * 100 : 0;
  return css`
    &::after {
      width: ${width}%;
    }
  `;
};

const oneAnimation = keyframes`
  0% {
    width: 0%;
  }

  100% {
    width: 100%;
  }
`;

const loopAnimation = keyframes`
  0% {
    width: 0%;
    transform: translateX(0%);
  }

  90% {
    width: 100%;
    transform: translateX(0%);
  }

  100% {
    width: 100%;
    transform: translateX(100%);
  }
`;

const timedStyles = ({
  theme,
  duration = 3000,
  loop = false,
  paused = false,
}: StyleProps & TimeProgressElProps) => css`
  &::after {
    border-radius: ${theme.borderRadius.pill};
    animation-name: ${loop ? loopAnimation : oneAnimation};
    animation-duration: ${duration}ms;
    animation-play-state: ${paused ? 'paused' : 'running'};
    animation-fill-mode: forwards;
    animation-iteration-count: ${loop ? 'infinite' : 1};
  }
`;

const variantStyles = ({ variant = 'primary' }: Omit<BaseProps, 'label'>) => {
  const variantMap = {
    primary: 'var(--cui-bg-accent-strong)',
    secondary: 'var(--cui-bg-strong)',
  };
  return css`
    &::after {
      background-color: ${variantMap[variant]};
    }
  `;
};

const sizeStyles = ({
  theme,
  size = 'kilo',
}: StyleProps & Omit<BaseProps, 'label'>) => {
  const sizeMap = {
    byte: theme.spacings.bit,
    kilo: theme.spacings.byte,
    mega: theme.spacings.mega,
  };
  return css({
    height: sizeMap[size],
  });
};

const TaskProgress = styled('span')<TaskProgressElProps>(
  baseStyles,
  variantStyles,
  sizeStyles,
  taskStyles,
);

const TimeProgress = styled('span')<TimeProgressElProps>(
  baseStyles,
  variantStyles,
  sizeStyles,
  timedStyles,
);

const labelStyles = ({ theme }: StyleProps) => css`
  margin-left: ${theme.spacings.byte};
`;

const labelHiddenStyles = ({ hideLabel }: LabelElProps) =>
  hideLabel && hideVisually();

const ProgressBarLabel = styled('span')<LabelElProps>(
  typography('two'),
  labelStyles,
  labelHiddenStyles,
);

/**
 * The ProgressBar component communicates the progress of a task or timer
 * to the user.
 */
export function ProgressBar(props: BaseProps & StepProgressProps): ReturnType;
export function ProgressBar(props: BaseProps & TimeProgressProps): ReturnType;
export function ProgressBar({
  max,
  value,
  size,
  variant,
  duration,
  loop,
  paused,
  label,
  hideLabel,
  ...props
}: ProgressBarProps): JSX.Element {
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test' &&
    !label
  ) {
    throw new AccessibilityError('ProgressBar', 'The `label` prop is missing.');
  }
  const ariaId = useId();
  return (
    <ProgressBarWrapper {...props}>
      {max || value ? (
        <TaskProgress
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-labelledby={ariaId}
          max={max}
          value={value}
          size={size}
          variant={variant}
        />
      ) : (
        <TimeProgress
          role="progressbar"
          aria-labelledby={ariaId}
          duration={duration}
          loop={loop}
          paused={paused}
          size={size}
          variant={variant}
        />
      )}
      <ProgressBarLabel id={ariaId} hideLabel={hideLabel}>
        {label}
      </ProgressBarLabel>
    </ProgressBarWrapper>
  );
}
