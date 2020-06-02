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

import React, { ReactElement, ReactNode } from 'react';
import { css, keyframes } from '@emotion/core';

import styled, { StyleProps } from '../../styles/styled';
import { textKilo } from '../../styles/style-helpers';
import { uniqueId } from '../../util/id';

interface BaseProps {
  children?: ReactNode;
  /**
   * Choose from 2 style variants. Default: 'primary'.
   */
  variant?: 'primary' | 'secondary';
  /**
   * Choose from 3 sizes. Default: 'kilo'.
   */
  size?: 'byte' | 'kilo' | 'mega';
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

type ReturnType = ReactElement<any, any> | null;

const wrapperStyles = () => css`
  display: flex;
  align-items: center;
`;

const ProgressBarWrapper = styled('div')<{}>(wrapperStyles);

const baseStyles = ({ theme }: StyleProps) => css`
  label: progress-bar;
  background-color: ${theme.colors.n200};
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
    background-color: ${theme.colors.p500};
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
  duration = 3000,
  loop = false,
  paused = false
}: TimeProgressProps) => css`
  &::after {
    animation-name: ${loop ? loopAnimation : oneAnimation};
    animation-duration: ${duration}ms;
    animation-play-state: ${paused ? 'paused' : 'running'};
    animation-fill-mode: forwards;
    animation-iteration-count: ${loop ? 'infinite' : 1};
  }
`;

const variantStyles = ({
  theme,
  variant = 'primary'
}: StyleProps & BaseProps) => {
  const variantMap = {
    primary: theme.colors.p500,
    secondary: theme.colors.n900
  };
  return css`
    label: ${`progress-bar--${variant}`};

    &::after {
      background-color: ${variantMap[variant]};
    }
  `;
};

const sizeStyles = ({ theme, size = 'kilo' }: StyleProps & BaseProps) => {
  const sizeMap = {
    byte: theme.spacings.bit,
    kilo: theme.spacings.byte,
    mega: theme.spacings.mega
  };
  return css({
    label: `progress-bar--${size}`,
    height: sizeMap[size]
  });
};

const TaskProgress = styled('span')<BaseProps & StepProgressProps>(
  baseStyles,
  variantStyles,
  sizeStyles,
  taskStyles
);

const TimeProgress = styled('span')<BaseProps & TimeProgressProps>(
  baseStyles,
  variantStyles,
  sizeStyles,
  timedStyles
);

const labelStyles = ({ theme }: StyleProps) => css`
  label: progress-bar__label;
  ${textKilo({ theme })};
  margin-left: ${theme.spacings.byte};
`;

const ProgressBarLabel = styled('span')<{}>(labelStyles);

/**
 * The ProgressBar component communicates the progress of a task or timer
 * to the user.
 */
export function ProgressBar(props: BaseProps & StepProgressProps): ReturnType;
export function ProgressBar(props: BaseProps & TimeProgressProps): ReturnType;
export function ProgressBar({
  children,
  max,
  value,
  size,
  variant,
  duration,
  loop,
  paused,
  ...props
}: ProgressBarProps) {
  const ariaId = uniqueId('progress-bar_');
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
          aria-labelledby={ariaId}
          duration={duration}
          loop={loop}
          paused={paused}
          size={size}
          variant={variant}
        />
      )}
      <ProgressBarLabel id={ariaId}>{children}</ProgressBarLabel>
    </ProgressBarWrapper>
  );
}
