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
import { isFunction } from 'lodash/fp';

import * as StepService from '../StepService';
import { useClickHandler } from '../../../hooks/useClickHandler';

export function useStep(props = {}) {
  if (
    process.env.NODE_ENV !== 'production' &&
    props.cycle &&
    !props.totalSteps
  ) {
    throw new Error('Cannot use cycle prop without totalSteps prop.');
  }

  if (
    process.env.NODE_ENV !== 'production' &&
    props.autoPlay &&
    !props.stepDuration
  ) {
    throw new Error('Cannot use autoPlay prop without stepDuration prop.');
  }

  const initialState = {
    step: props.initialStep,
    previousStep: StepService.calculatePreviousStep({
      step: props.initialStep,
      totalSteps: props.totalSteps,
      stepInterval: props.stepInterval,
      cycle: props.cycle,
    }),
    paused: !props.autoPlay,
  };
  const [state, dispatch] = useReducer(StepService.reducer, initialState);
  const playingInterval = useRef(null);
  const animationEndCallback = useRef(null);
  const { onNext, onPrevious, onPause, onPlay, tracking } = props;
  const handleNext = useClickHandler(
    onNext,
    { label: 'next', ...tracking },
    'carousel',
  );
  const handlePrevious = useClickHandler(
    onPrevious,
    { label: 'previous', ...tracking },
    'carousel',
  );
  const handlePause = useClickHandler(
    onPause,
    { label: 'pause', ...tracking },
    'carousel',
  );
  const handlePlay = useClickHandler(
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
    const { totalSteps, cycle, stepInterval } = props;
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
    const { totalSteps, cycle, stepInterval } = props;
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
    const stepDuration = getDurationFromProp(props.stepDuration);

    return stepDuration && !state.paused;
  }

  function shouldStop() {
    const { totalSteps, cycle } = props;
    const isLastStep = state.step === totalSteps - 1;
    const stepDuration = getDurationFromProp(props.stepDuration);

    return stepDuration && !cycle && isLastStep;
  }

  function getDurationFromProp(duration) {
    return isFunction(duration) ? duration(state.step) : duration;
  }

  function startPlaying() {
    if (!playingInterval.current) {
      playingInterval.current = setInterval(
        next,
        getDurationFromProp(props.stepDuration),
      );
    }
  }

  function stopPlaying() {
    if (playingInterval.current) {
      playingInterval.current = clearInterval(playingInterval.current);
    }
  }

  // STATE MANAGEMENT
  function updateSlide(newStep, onEndCallback) {
    const animationDuration = getDurationFromProp(props.animationDuration);
    const update = () => {
      animationEndCallback.current = clearTimeout(animationEndCallback.current);

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

    if (animationDuration) {
      animationEndCallback.current = setTimeout(update, animationDuration);
    } else {
      update();
    }
  }

  function updatePause(paused) {
    const stepDuration = getDurationFromProp(props.stepDuration);

    if (!stepDuration) {
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

  function getStateAndHelpers() {
    const actions = {
      next,
      previous,
      play,
      pause,
    };
    const propGetters = StepService.generatePropGetters(actions);
    const stepDuration = getDurationFromProp(props.stepDuration);
    const animationDuration = getDurationFromProp(props.animationDuration);

    return {
      state: {
        ...state,
        stepDuration,
        animationDuration,
      },
      actions,
      ...propGetters,
    };
  }

  return getStateAndHelpers();
}
