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

import { useReducer, useEffect, useRef } from 'react';

import { useClickEvent } from '../../../hooks/useClickEvent';
import { CircuitError } from '../../../util/errors';
import { isFunction } from '../../../util/type-check';
import * as StepService from '../StepService';
import { Duration, StateAndHelpers, StepOptions } from '../types';

export function useStep({
  initialStep = 0,
  totalSteps = 0,
  autoPlay = false,
  cycle = false,
  stepInterval = 1,
  animationDuration = 0,
  stepDuration = 0,
  tracking,
  onNext,
  onPrevious,
  onPause,
  onPlay,
}: StepOptions = {}): StateAndHelpers {
  if (process.env.NODE_ENV !== 'production' && cycle && !totalSteps) {
    throw new CircuitError(
      'useStep',
      'Cannot use `cycle` prop without `totalSteps` prop.',
    );
  }

  if (process.env.NODE_ENV !== 'production' && autoPlay && !stepDuration) {
    throw new CircuitError(
      'useStep',
      'Cannot use `autoPlay` prop without `stepDuration` prop.',
    );
  }

  const initialState = {
    step: initialStep,
    previousStep: StepService.calculatePreviousStep({
      step: initialStep,
      totalSteps,
      stepInterval,
      cycle,
    }),
    paused: !autoPlay,
  };
  const [state, dispatch] = useReducer(StepService.reducer, initialState);
  const playingInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const animationEndCallback = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const handleNext = useClickEvent(
    onNext,
    { label: 'next', ...tracking },
    'carousel',
  );
  const handlePrevious = useClickEvent(
    onPrevious,
    { label: 'previous', ...tracking },
    'carousel',
  );
  const handlePause = useClickEvent(
    onPause,
    { label: 'pause', ...tracking },
    'carousel',
  );
  const handlePlay = useClickEvent(
    onPlay,
    { label: 'play', ...tracking },
    'carousel',
  );

  useEffect(() => {
    const playable = shouldPlay();
    const finished = shouldStop();

    if (playable && !finished) {
      startPlaying();
    }

    return function cleanup() {
      stopPlaying();
    };
  });

  // ACTIONS
  function next() {
    const newStep = StepService.calculateNextStep({
      step: state.step,
      stepInterval,
      totalSteps,
      cycle,
    });

    updateSlide(newStep, () => {
      if (isFunction(handleNext)) {
        handleNext(getStateAndHelpers());
      }
    });
  }

  function previous() {
    const newStep = StepService.calculatePreviousStep({
      step: state.step,
      stepInterval,
      totalSteps,
      cycle,
    });

    updateSlide(newStep, () => {
      if (isFunction(handlePrevious)) {
        handlePrevious(getStateAndHelpers());
      }
    });
  }

  function pause() {
    updatePause(true);

    if (isFunction(handlePause)) {
      handlePause(getStateAndHelpers());
    }
  }

  function play() {
    updatePause(false);

    if (isFunction(handlePlay)) {
      handlePlay(getStateAndHelpers());
    }
  }

  // HELPERS
  function shouldPlay() {
    const duration = getDurationFromProp(stepDuration);

    return duration && !state.paused;
  }

  function shouldStop() {
    const isLastStep = state.step === totalSteps - 1;
    const duration = getDurationFromProp(stepDuration);

    return duration && !cycle && isLastStep;
  }

  function getDurationFromProp(duration: Duration) {
    return isFunction(duration) ? duration(state.step) : duration;
  }

  function startPlaying() {
    if (!playingInterval.current) {
      playingInterval.current = setInterval(
        next,
        getDurationFromProp(stepDuration),
      );
    }
  }

  function stopPlaying() {
    if (playingInterval.current) {
      clearInterval(playingInterval.current);
      playingInterval.current = null;
    }
  }

  // STATE MANAGEMENT
  function updateSlide(newStep: number, onEndCallback: () => void) {
    const duration = getDurationFromProp(animationDuration);
    const update = () => {
      if (animationEndCallback.current) {
        clearTimeout(animationEndCallback.current);
        animationEndCallback.current = null;
      }

      stopPlaying();
      dispatch({
        type: 'updateSlide',
        payload: {
          step: newStep,
          previousStep: state.step,
        },
      });
      onEndCallback();
    };

    if (duration) {
      animationEndCallback.current = setTimeout(update, duration);
    } else {
      update();
    }
  }

  function updatePause(paused: boolean) {
    const duration = getDurationFromProp(stepDuration);

    if (!duration) {
      return;
    }

    dispatch({
      type: 'updatePause',
      payload: { paused },
    });

    if (paused) {
      stopPlaying();
    } else {
      startPlaying();
    }
  }

  function getStateAndHelpers(): StateAndHelpers {
    const actions = {
      next,
      previous,
      play,
      pause,
    };
    const propGetters = StepService.generatePropGetters(actions);

    return {
      state: {
        ...state,
        stepDuration: getDurationFromProp(stepDuration),
        animationDuration: getDurationFromProp(animationDuration),
      },
      actions,
      ...propGetters,
    };
  }

  return getStateAndHelpers();
}
