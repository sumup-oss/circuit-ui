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

import React, { FC } from 'react';
import { css } from '@emotion/core';

import styled, { StyleProps } from '../../styles/styled';
import { textKilo } from '../../styles/style-helpers';
import { uniqueId } from '../../util/id';

type Size = 'kilo' | 'mega' | 'giga';

export interface ProgressBarProps {
  /**
   * A number greater than zero, indicating how much work the task requires.
   */
  max?: number;
  /**
   * A number between 0 and max, indicating how much of the task has been
   * completed.
   */
  value?: number;
  /**
   * TODO: Add proper explanation
   */
  size?: Size;
}

const calculateSize = ({
  theme,
  size = 'kilo'
}: StyleProps & Pick<ProgressBarProps, 'size'>) => {
  const sizeMap = {
    kilo: theme.spacings.byte,
    mega: theme.spacings.mega,
    giga: theme.spacings.tera
  };
  return sizeMap[size];
};

const wrapperStyles = ({ theme }: StyleProps) => css`
  label: progress-bar;
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacings.mega};
`;

const ProgressBarWrapper = styled('div')<{}>(wrapperStyles);

const progressStyles = ({
  theme,
  size,
  value,
  max
}: StyleProps & ProgressBarProps) => {
  const outerBorderWidth = '1px';
  const outerBorderRadius = theme.borderRadius.mega;
  const innerBorderRadiusLeft = `calc(${outerBorderRadius} - ${outerBorderWidth})`;
  const innerBorderRadiusRight =
    value && max && (value / max) * 100 === 100 ? innerBorderRadiusLeft : 0;
  const width = value && max ? (value / max) * 100 : 0;
  return css`
    label: progress-bar__progress;
    background-color: ${theme.colors.n100};
    border: ${outerBorderWidth} solid ${theme.colors.n300};
    border-radius: ${outerBorderRadius};
    position: relative;
    width: 100%;
    height: ${calculateSize({ theme, size })};
    overflow: hidden;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: ${width}%;
      background-color: ${theme.colors.p500};
      border: 1px solid ${theme.colors.p700};
      box-shadow: inset 0 1px 0 0 ${theme.colors.p300};
      border-radius: ${innerBorderRadiusLeft} ${innerBorderRadiusRight}
        ${innerBorderRadiusRight} ${innerBorderRadiusLeft};
      transition: width 0.05s ease-out;
    }
  `;
};

const ProgressBarProgress = styled('span')<ProgressBarProps>(progressStyles);

const labelStyles = ({ theme }: StyleProps) => css`
  label: progress-bar__label;
  ${textKilo({ theme })};
  margin-left: ${theme.spacings.byte};
`;

const ProgressBarLabel = styled('span')<{}>(labelStyles);

/**
 * Progress bar component to indicate progress
 */
export const ProgressBar: FC<ProgressBarProps> = ({
  children,
  max = 1,
  value = 0,
  size = 'kilo',
  ...props
}) => {
  const ariaId = uniqueId('progress-bar_');
  return (
    <ProgressBarWrapper {...props}>
      <ProgressBarProgress
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-labelledby={ariaId}
        size={size}
        max={max}
        value={value}
      />
      <ProgressBarLabel id={ariaId}>{children}</ProgressBarLabel>
    </ProgressBarWrapper>
  );
};
