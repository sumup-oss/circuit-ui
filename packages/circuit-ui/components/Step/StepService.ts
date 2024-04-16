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

import { eachFn } from '../../util/helpers.js';

import type { Actions, InternalState, PropGetters } from './types.js';

type Data = {
  step?: number;
  firstStep?: number;
  stepInterval?: number;
  totalSteps?: number;
  cycle?: boolean;
};

export function calculateNextStep(data: Data = {}): number {
  const { step, stepInterval = 1, firstStep = 0, totalSteps, cycle } = data;
  const nextStep = (step || firstStep) + stepInterval;

  if (totalSteps) {
    const lastStep = totalSteps - 1;
    const isOutOfRange = nextStep > lastStep;

    if (cycle && isOutOfRange) {
      return firstStep;
    }

    if (isOutOfRange) {
      return lastStep;
    }
  }

  return nextStep;
}

export function calculatePreviousStep(data: Data = {}): number {
  const { step, stepInterval = 1, firstStep = 0, totalSteps, cycle } = data;
  const previousStep = (step || firstStep) - stepInterval;
  const isOutOfRange = previousStep < firstStep;

  if (totalSteps && cycle && isOutOfRange) {
    const lastStep = totalSteps - 1;
    return lastStep;
  }

  if (isOutOfRange) {
    return firstStep;
  }

  return previousStep;
}

export function reducer(
  state: InternalState,
  action: { type: string; payload: Partial<InternalState> },
): InternalState {
  const { type, payload } = action;

  switch (type) {
    default:
      return { ...state, ...payload };
  }
}

export function generatePropGetters(actions: Actions): PropGetters {
  return {
    // @ts-expect-error The type will be inferred correctly as long as the
    // generic type isn't manually overridden.
    getPlayControlProps: (props = {}) => ({
      'aria-label': 'play',
      ...props,
      'onClick': eachFn([props.onClick, actions.play]),
    }),
    // @ts-expect-error The type will be inferred correctly as long as the
    // generic type isn't manually overridden.
    getPauseControlProps: (props = {}) => ({
      'aria-label': 'pause',
      ...props,
      'onClick': eachFn([props.onClick, actions.pause]),
    }),
    // @ts-expect-error The type will be inferred correctly as long as the
    // generic type isn't manually overridden.
    getNextControlProps: (props = {}) => ({
      'aria-label': 'next',
      ...props,
      'onClick': eachFn([props.onClick, actions.next]),
    }),
    // @ts-expect-error The type will be inferred correctly as long as the
    // generic type isn't manually overridden.
    getPreviousControlProps: (props = {}) => ({
      'aria-label': 'previous',
      ...props,
      'onClick': eachFn([props.onClick, actions.previous]),
    }),
  };
}
