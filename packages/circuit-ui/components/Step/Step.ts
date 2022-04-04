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

import { isFunction } from '../../util/type-check';

import { useStep } from './hooks/useStep';
import { StateAndHelpers, StepOptions } from './types';

export interface StepProps extends StepOptions {
  /**
   * Function called with an object containing current state and prop getters.
   */
  children: (stateAndHelpers: StateAndHelpers) => JSX.Element;
}

export default function Step({
  children,
  totalSteps,
  initialStep,
  autoPlay,
  cycle,
  stepInterval,
  animationDuration,
  stepDuration,
  tracking,
  onPlay,
  onPause,
  onNext,
  onPrevious,
}: StepProps): JSX.Element {
  const stateAndHelpers = useStep({
    totalSteps,
    initialStep,
    autoPlay,
    cycle,
    stepInterval,
    animationDuration,
    stepDuration,
    tracking,
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
