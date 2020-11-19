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
import { mocked } from 'ts-jest/utils';
import * as Collector from '@sumup/collector';

import useClickHandler from './use-click-handler';

const mockCollector = mocked(Collector, true);

jest.mock('@sumup/collector');

describe('useClickHandler', () => {
  afterEach(jest.clearAllMocks);
  afterAll(jest.resetModules);

  describe('when the click should NOT be tracked', () => {
    const tracking = undefined;
    const defaultComponentName = 'test';

    it('should call the onClick callback with the event', async () => {
      const onClick = jest.fn();
      const { result } = renderHook(() =>
        useClickHandler(onClick, tracking, defaultComponentName),
      );

      const event = new MouseEvent('click');
      await act(() => {
        expect(result).not.toBeUndefined();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        result.current!(event);
      });

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(event);
    });

    it('should NOT call the tracking dispatch', async () => {
      const dispatch = jest.fn();
      mockCollector.useClickTrigger = jest.fn(() => dispatch);

      const onClick = jest.fn();
      const { result } = renderHook(() =>
        useClickHandler(onClick, tracking, defaultComponentName),
      );

      const event = new MouseEvent('click');
      await act(() => {
        expect(result).not.toBeUndefined();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        result.current!(event);
      });

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('should return undefined if there is no onClick callback', () => {
      const onClick = undefined;
      const { result } = renderHook(() =>
        useClickHandler(onClick, tracking, defaultComponentName),
      );

      expect(result.current).toBeUndefined();
    });
  });

  describe('when the click should be tracked', () => {
    const tracking = { label: 'trackingId' };
    const defaultComponentName = 'test';

    it('should call the onClick callback with the event', async () => {
      const onClick = jest.fn();
      const { result } = renderHook(() =>
        useClickHandler(onClick, tracking, defaultComponentName),
      );

      const event = new MouseEvent('click');
      await act(() => {
        expect(result).not.toBeUndefined();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        result.current!(event);
      });

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(event);
    });

    it('should call the tracking dispatch', async () => {
      const dispatch = jest.fn();
      mockCollector.useClickTrigger = jest.fn(() => dispatch);

      const onClick = jest.fn();
      const { result } = renderHook(() =>
        useClickHandler(onClick, tracking, defaultComponentName),
      );

      const event = new MouseEvent('click');
      await act(() => {
        expect(result).not.toBeUndefined();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        result.current!(event);
      });

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        label: 'trackingId',
        component: defaultComponentName,
      });
    });
  });
});
