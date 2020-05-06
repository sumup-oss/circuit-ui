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

import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';

import { SLIDE_DURATION } from '../../constants';

const progressAnimation = keyframes`
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
    transform: translateX(102%);
  }
`;
const progressStyles = ({ theme, paused, animationDuration, cycle }) => css`
  label: carousel__progress;
  width: 100%;
  height: 2px;
  overflow: hidden;
  background-color: ${theme.colors.n200};
  border-radius: ${theme.borderRadius.giga};

  &:after {
    content: '';
    display: block;
    background-color: ${theme.colors.black};
    animation-name: ${progressAnimation};
    animation-duration: ${animationDuration}ms;
    animation-play-state: ${paused ? 'paused' : 'running'};
    animation-fill-mode: forwards;
    animation-iteration-count: ${cycle ? 'infinite' : 1};
    height: 100%;
  }
`;
const Progress = styled('div')(progressStyles);

Progress.propTypes = {
  paused: PropTypes.bool,
  animationDuration: PropTypes.number,
  slideDuration: PropTypes.number
};

Progress.defaultProps = {
  /**
   * Indicates if progress animation is currently paused.
   */
  paused: false,
  /**
   * Indicates if progress animation is restarted after finishing.
   */
  cycle: false,
  /**
   * Indicatest duration of progress animation (in milliseconds).
   */
  animationDuration: SLIDE_DURATION
};

export default Progress;
