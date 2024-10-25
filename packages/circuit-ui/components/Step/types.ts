/**
 * Copyright 2022, SumUp Ltd.
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

import type { ClickEvent } from '../../types/events';

export type Play = () => void;
export type Pause = () => void;
export type Next = () => void;
export type Previous = () => void;

export type Duration = number | ((step?: number) => number);

export type InternalState = {
  step: number;
  previousStep: number;
  paused: boolean;
};

export type State = InternalState & {
  stepDuration: number;
  animationDuration: number;
};

export type Actions = {
  play: Play;
  pause: Pause;
  next: Next;
  previous: Previous;
};

type BaseProps = { onClick?: () => void; [key: string]: unknown };
type ReturnProps<Props> = Props & {
  'aria-label': string;
  'onClick'?: (event: ClickEvent) => void;
};

type PropGetter = <Props extends BaseProps = BaseProps>(
  props?: Props,
) => ReturnProps<Props>;

export type PropGetters = {
  getPlayControlProps: PropGetter;
  getPauseControlProps: PropGetter;
  getNextControlProps: PropGetter;
  getPreviousControlProps: PropGetter;
};

export type StateAndHelpers = PropGetters & {
  state: State;
  actions: Actions;
};
export interface StepOptions {
  /**
   * The total number of steps. Defaults to `0`.
   */
  totalSteps?: number;
  /**
   * The initial step of component. Defaults to `0`.
   */
  initialStep?: number;
  /**
   * Indicates if component should restart after last step. Defaults to `false`.
   */
  cycle?: boolean;
  /**
   * Enable immediate playing of a component after load.
   * Requires `stepDuration` to have any effect. Defaults to `false`.
   */
  autoPlay?: boolean;
  /**
   * The number of steps to interate when navigating. Defaults to `1`.
   */
  stepInterval?: number;
  /**
   * Indicates how long each step will stay visible (in milliseconds).
   * This prop is required for componenets play/pause functionality.
   * If used as function receives state as argument which allows to configure
   * duration based on the data per step. Function should return a number.
   * Defaults to 0.
   */
  stepDuration?: Duration;
  /**
   * Indicates duration of animation between steps (in milliseconds).
   * If used as function receives state as argument which allows to configure
   * duration based on the data per step. Function should return a number.
   * Defaults to 0.
   */
  animationDuration?: Duration;
  /**
   * Function called when play action is triggered.
   */
  onPlay?: (stateAndHelpers: StateAndHelpers) => void;
  /**
   * Function called when pause action is triggered.
   */
  onPause?: (stateAndHelpers: StateAndHelpers) => void;
  /**
   * Function called when go to next step action is triggered.
   */
  onNext?: (stateAndHelpers: StateAndHelpers) => void;
  /**
   * Function called when go to previous step action is triggered.
   */
  onPrevious?: (stateAndHelpers: StateAndHelpers) => void;
}
