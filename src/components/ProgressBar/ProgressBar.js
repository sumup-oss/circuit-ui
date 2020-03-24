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

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { childrenPropType } from '../../util/shared-prop-types';
import { textKilo, subtractUnit } from '../../styles/style-helpers';
import { uniqueId } from '../../util/id';
import { sizes } from '../../styles/constants';

const { KILO, MEGA, GIGA } = sizes;

const calculateSize = ({ theme, size }) => {
  const sizeMap = {
    [KILO]: theme.spacings.byte,
    [MEGA]: theme.spacings.mega,
    [GIGA]: theme.spacings.tera
  };
  return sizeMap[size];
};

const wrapperStyles = ({ theme }) => css`
  label: progress-bar;
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacings.mega};
`;

const progressStyles = ({ theme, size, value, max }) => {
  const outerBorderWidth = '1px';
  const outerBorderRadius = theme.borderRadius.mega;
  const innerBorderRadiusLeft = `${subtractUnit(
    outerBorderRadius,
    outerBorderWidth
  )}`;
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

const labelStyles = ({ theme }) => css`
  label: progress-bar__label;
  ${textKilo({ theme })};
  margin-left: ${theme.spacings.byte};
`;

const ProgressBarWrapper = styled('div')`
  ${wrapperStyles};
`;
const ProgressBarProgress = styled('span')`
  ${progressStyles};
`;
const ProgressBarLabel = styled('span')`
  ${labelStyles};
`;

/**
 * Progress bar component to indicate progress
 */
const ProgressBar = ({ children, max, value, size, ...props }) => {
  const ariaId = uniqueId('progress-bar_');
  return (
    <ProgressBarWrapper {...props}>
      <ProgressBarProgress
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin="0"
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

ProgressBar.KILO = KILO;
ProgressBar.MEGA = MEGA;
ProgressBar.GIGA = GIGA;

ProgressBar.propTypes = {
  /**
   * A number greater than zero, indicating how much work the task requires.
   */
  max: PropTypes.number,
  /**
   * A number between 0 and max, indicating how much of the task has been
   * completed.
   */
  value: PropTypes.number,
  /**
   * Size
   */
  size: PropTypes.oneOf([ProgressBar.KILO, ProgressBar.MEGA, ProgressBar.GIGA]),
  /**
   * Child nodes to be rendered as the label.
   */
  children: childrenPropType
};

ProgressBar.defaultProps = {
  size: ProgressBar.KILO,
  max: 1,
  value: 0,
  children: null
};

/**
 * @component
 */
export default ProgressBar;
