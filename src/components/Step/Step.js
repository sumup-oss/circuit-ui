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
import { isFunction } from 'lodash/fp';

import useStep from './hooks/use-step';

function Step({
  children,
  totalSteps = 0,
  initialStep = 0,
  autoPlay = false,
  cycle = false,
  stepInterval = 1,
  animationDuration = 0,
  stepDuration = 0,
  onPlay = () => {},
  onPause = () => {},
  onNext = () => {},
  onPrevious = () => {},
}) {
  const stateAndHelpers = useStep({
    totalSteps,
    initialStep,
    autoPlay,
    cycle,
    stepInterval,
    animationDuration,
    stepDuration,
    onPlay,
    onPause,
    onNext,
    onPrevious,
  });

  if (!isFunction(children)) {
    throw new Error('Children must be a function');
  }

  return children(stateAndHelpers);
}

Step.propTypes = {
  /**
   * The total number of steps. Defaults to `0`.
   */
  totalSteps: PropTypes.number,
  /**
   * The initial step of component. Defaults to `0`.
   */
  initialStep: PropTypes.number,
  /**
   * Indicates if component should restart after last step. Defaults to `false`.
   */
  cycle: PropTypes.bool,
  /**
   * Enable immediate playing of a component after load.
   * Requires `stepDuration` to have any effect. Defaults to `false`.
   */
  autoPlay: PropTypes.bool,
  /**
   * The number of steps to interate when navigating. Defaults to `1`.
   */
  stepInterval: PropTypes.number,
  /**
   * Indicates how long each step will stay visible (in milliseconds).
   * This prop is required for componenets play/pause functionality.
   * If used as function receives state as argument which allows to configure
   * duration based on the data per step. Function should return a number.
   * Defaults to 0.
   */
  stepDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  /**
   * Indicates duration of animation between steps (in milliseconds).
   * If used as function receives state as argument which allows to configure
   * duration based on the data per step. Function should return a number.
   * Defaults to 0.
   */
  animationDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  /**
   * Function called when play action is triggered.
   */
  onPlay: PropTypes.func,
  /**
   * Function called when pause action is triggered.
   */
  onPause: PropTypes.func,
  /**
   * Function called when go to next step action is triggered.
   */
  onNext: PropTypes.func,
  /**
   * Function called when go to previous step action is triggered.
   */
  onPrevious: PropTypes.func,
  /**
   * Function called with an object containing current state and prop getters.
   */
  children: PropTypes.func,
};

export default Step;
