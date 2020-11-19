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

import { renderHook, act } from '@testing-library/react-hooks';

import useStep from './use-step';

describe('useStep', () => {
  it('should return state based on default values', () => {
    const defaults = {
      initialStep: 0,
      totalSteps: 2,
      cycle: true,
      autoPlay: false,
    };
    const { result, unmount } = renderHook(() => useStep(defaults));

    expect(result.current.state).toMatchObject({
      step: defaults.initialStep,
      previousStep: defaults.totalSteps - 1,
      paused: true,
    });

    unmount();
  });

  it('should warn if cycle is used without totalSteps prop in dev environment', () => {
    const { result } = renderHook(() => useStep({ cycle: true }));
    const expectedError = new Error(
      'Cannot use cycle prop without totalSteps prop.',
    );

    expect(result.error).toEqual(expectedError);
  });

  it('should warn if autoPlay is used without stepDuration prop', () => {
    const { result } = renderHook(() => useStep({ autoPlay: true }));
    const expectedError = Error(
      'Cannot use autoPlay prop without stepDuration prop.',
    );

    expect(result.error).toEqual(expectedError);
  });

  it('should return actions and prop getters', () => {
    const expected = expect.objectContaining({
      actions: expect.objectContaining({
        play: expect.any(Function),
        pause: expect.any(Function),
        next: expect.any(Function),
        previous: expect.any(Function),
      }),
      getPlayControlProps: expect.any(Function),
      getPauseControlProps: expect.any(Function),
      getNextControlProps: expect.any(Function),
      getPreviousControlProps: expect.any(Function),
    });
    const { result, unmount } = renderHook(() => useStep());

    expect(result.current).toMatchObject(expected);

    unmount();
  });

  it('should update paused state when pause action is called', async () => {
    const { result, unmount } = renderHook(() =>
      useStep({
        autoPlay: true,
        stepDuration: 3000,
      }),
    );

    expect(result.current.state.paused).toEqual(false);

    await act(() => {
      result.current.actions.pause();
    });

    expect(result.current.state.paused).toEqual(true);

    unmount();
  });

  it('should update paused state when play action is called', async () => {
    const { result, unmount } = renderHook(() =>
      useStep({
        autoPlay: false,
        stepDuration: 3000,
      }),
    );

    expect(result.current.state.paused).toEqual(true);

    await act(() => {
      result.current.actions.play();
    });

    expect(result.current.state.paused).toEqual(false);

    unmount();
  });

  it('should not update state if play action is called repeatedly', async () => {
    const { result, unmount } = renderHook(() =>
      useStep({
        autoPlay: false,
        stepDuration: 3000,
      }),
    );

    expect(result.current.state.paused).toEqual(true);

    await act(() => {
      result.current.actions.play();
    });

    expect(result.current.state.paused).toEqual(false);

    await act(() => {
      result.current.actions.play();
    });

    expect(result.current.state.paused).toEqual(false);

    unmount();
  });

  it('should not update paused state when step duration is missing in props', async () => {
    const { result, unmount } = renderHook(() => useStep());

    expect(result.current.state.paused).toEqual(true);

    await act(() => {
      result.current.actions.play();
    });

    expect(result.current.state.paused).toEqual(true);

    unmount();
  });

  it('should update steps state when next action is called', async () => {
    const initialStep = 1;
    const { result, unmount } = renderHook(() => useStep({ initialStep }));

    expect(result.current.state.step).toEqual(initialStep);
    expect(result.current.state.previousStep).toEqual(initialStep - 1);

    await act(() => {
      result.current.actions.next();
    });

    expect(result.current.state.step).toEqual(initialStep + 1);
    expect(result.current.state.previousStep).toEqual(initialStep);

    unmount();
  });

  it('should update steps state when previous action is called', async () => {
    const initialStep = 1;
    const { result, unmount } = renderHook(() => useStep({ initialStep }));

    expect(result.current.state.step).toEqual(initialStep);
    expect(result.current.state.previousStep).toEqual(initialStep - 1);

    await act(() => {
      result.current.actions.previous();
    });

    expect(result.current.state.step).toEqual(initialStep - 1);
    expect(result.current.state.previousStep).toEqual(initialStep);

    unmount();
  });

  it('should update steps state based on used step interval', async () => {
    const initialStep = 1;
    const stepInterval = 3;
    const { result, unmount } = renderHook(() =>
      useStep({ initialStep, stepInterval }),
    );

    expect(result.current.state.step).toEqual(initialStep);
    expect(result.current.state.previousStep).toEqual(0);

    await act(() => {
      result.current.actions.next();
    });

    expect(result.current.state.step).toEqual(initialStep + stepInterval);
    expect(result.current.state.previousStep).toEqual(initialStep);

    await act(() => {
      result.current.actions.previous();
    });

    expect(result.current.state.step).toEqual(initialStep);
    expect(result.current.state.previousStep).toEqual(
      initialStep + stepInterval,
    );

    unmount();
  });

  // eslint-disable-next-line max-len
  it('should automatically change steps based on step and animation duration', async () => {
    const initialStep = 1;
    const stepInterval = 1;
    const { result, waitForNextUpdate, unmount } = renderHook(() =>
      useStep({
        initialStep,
        stepInterval,
        autoPlay: true,
        stepDuration: 100,
        animationDuration: 100,
      }),
    );

    expect(result.current.state.paused).toEqual(false);
    expect(result.current.state.step).toEqual(initialStep);
    expect(result.current.state.previousStep).toEqual(
      initialStep - stepInterval,
    );

    await waitForNextUpdate();

    expect(result.current.state.paused).toEqual(false);
    expect(result.current.state.step).toEqual(initialStep + stepInterval);
    expect(result.current.state.previousStep).toEqual(initialStep);

    await act(() => {
      result.current.actions.pause();
    });

    expect(result.current.state.paused).toEqual(true);
    expect(result.current.state.step).toEqual(initialStep + stepInterval);
    expect(result.current.state.previousStep).toEqual(initialStep);

    unmount();
  });

  // eslint-disable-next-line max-len
  it('should accept functions for step and animation duration', async () => {
    const initialStep = 1;
    const stepInterval = 1;
    const { result, waitForNextUpdate, unmount } = renderHook(() =>
      useStep({
        initialStep,
        stepInterval,
        autoPlay: true,
        stepDuration: () => 100,
        animationDuration: () => 100,
      }),
    );

    expect(result.current.state.paused).toEqual(false);
    expect(result.current.state.step).toEqual(initialStep);
    expect(result.current.state.previousStep).toEqual(
      initialStep - stepInterval,
    );

    await waitForNextUpdate();

    expect(result.current.state.paused).toEqual(false);
    expect(result.current.state.step).toEqual(initialStep + stepInterval);
    expect(result.current.state.previousStep).toEqual(initialStep);

    unmount();
  });

  it('should restart if cycle and totalSteps props are specified', async () => {
    const initialStep = 0;
    const stepInterval = 1;
    const totalSteps = 2;
    const { result, unmount } = renderHook(() =>
      useStep({
        initialStep,
        stepInterval,
        totalSteps,
        cycle: true,
      }),
    );

    expect(result.current.state.step).toEqual(initialStep);
    expect(result.current.state.previousStep).toEqual(
      totalSteps - stepInterval,
    );

    await act(() => {
      result.current.actions.next();
    });
    expect(result.current.state.step).toEqual(initialStep + stepInterval);
    expect(result.current.state.previousStep).toEqual(initialStep);

    await act(() => {
      result.current.actions.next();
    });
    expect(result.current.state.step).toEqual(initialStep);
    expect(result.current.state.previousStep).toEqual(
      totalSteps - stepInterval,
    );

    unmount();
  });

  it('should support onPlay action handler props', async () => {
    const onPlay = jest.fn();
    const onPause = jest.fn();
    const onNext = jest.fn();
    const onPrevious = jest.fn();
    const { result, unmount } = renderHook(() =>
      useStep({ onPlay, onPause, onNext, onPrevious }),
    );

    await act(() => {
      result.current.actions.play();
    });
    expect(onPlay).toHaveBeenCalledTimes(1);

    await act(() => {
      result.current.actions.pause();
    });
    expect(onPause).toHaveBeenCalledTimes(1);

    await act(() => {
      result.current.actions.next();
    });
    expect(onNext).toHaveBeenCalledTimes(1);

    await act(() => {
      result.current.actions.previous();
    });
    expect(onPrevious).toHaveBeenCalledTimes(1);

    unmount();
  });
});
