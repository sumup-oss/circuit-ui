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

/* eslint-disable react/display-name */
import React from 'react';

import { renderHook, actHook } from '../../util/test-utils';

import { useSidePanel } from './useSidePanel';
import { SidePanelContext } from './SidePanelContext';

const defaultId = 'the_one';
const testId = 'test';

jest.mock('../../util/id', () => ({
  uniqueId: () => defaultId,
}));

describe('useSidePanel', () => {
  const setSidePanel = jest.fn();
  const updateSidePanel = jest.fn();
  const removeSidePanel = jest.fn().mockResolvedValue(undefined);

  const wrapper = ({ children }) => (
    <SidePanelContext.Provider
      value={{
        setSidePanel,
        updateSidePanel,
        removeSidePanel,
        isPrimaryContentResized: false,
        transitionDuration: 200,
      }}
    >
      {children}
    </SidePanelContext.Provider>
  );

  const panel = {
    backButtonLabel: 'Back',
    children: <p data-testid="children">Side panel content</p>,
    closeButtonLabel: 'Close',
    group: undefined,
    headline: 'Side panel title',
    onClose: undefined,
    tracking: { label: 'test-side-panel' },
  };

  it('should open the side panel when setSidePanel is called', () => {
    const { result } = renderHook(() => useSidePanel(), { wrapper });

    actHook(() => {
      result.current.setSidePanel(panel);
    });

    const expected = {
      ...panel,
      group: defaultId,
      id: defaultId,
    };
    expect(setSidePanel).toHaveBeenCalledWith(expected);
  });

  it('should open the side panel of a given group when setSidePanel is called', () => {
    const { result } = renderHook(() => useSidePanel(), { wrapper });

    actHook(() => {
      result.current.setSidePanel(panel);
      result.current.setSidePanel({ ...panel, group: testId });
    });

    const expected = {
      ...panel,
      group: testId,
      id: defaultId,
    };
    expect(setSidePanel).toHaveBeenCalledWith(expected);
  });

  it('should update the side panel when updateSidePanel is called', () => {
    const { result } = renderHook(() => useSidePanel(), { wrapper });

    actHook(() => {
      result.current.updateSidePanel({
        children: <p data-testid="children">Updated content</p>,
      });
    });

    const expected = {
      children: <p data-testid="children">Updated content</p>,
      group: defaultId,
    };
    expect(updateSidePanel).toHaveBeenCalledWith(expected);
  });

  it('should update the side panel of a given group when updateSidePanel is called', () => {
    const { result } = renderHook(() => useSidePanel(), { wrapper });

    actHook(() => {
      result.current.updateSidePanel({
        children: <p data-testid="children">Updated content</p>,
        group: testId,
      });
    });

    const expected = {
      children: <p data-testid="children">Updated content</p>,
      group: testId,
    };
    expect(updateSidePanel).toHaveBeenCalledWith(expected);
  });

  it('should remove the side panel when removeSidePanel is called', () => {
    const { result } = renderHook(() => useSidePanel(), { wrapper });

    actHook(() => {
      result.current.setSidePanel(panel);
    });

    actHook(() => {
      result.current.removeSidePanel();
    });

    const expected = defaultId;
    expect(removeSidePanel).toHaveBeenCalledWith(expected);
  });

  it('should remove the side panel of a given group when removeSidePanel is called', () => {
    const { result } = renderHook(() => useSidePanel(), { wrapper });

    actHook(() => {
      result.current.setSidePanel(panel);
      result.current.setSidePanel({ ...panel, group: testId });
    });

    actHook(() => {
      result.current.removeSidePanel(testId);
    });

    const expected = testId;
    expect(removeSidePanel).toHaveBeenCalledWith(expected);
  });

  it('should remove the side panel when the component is unmounted', () => {
    const { result, unmount } = renderHook(() => useSidePanel(), { wrapper });

    actHook(() => {
      result.current.setSidePanel(panel);
    });

    actHook(() => {
      unmount();
    });

    const expected = defaultId;
    expect(removeSidePanel).toHaveBeenCalledWith(expected);
  });
});
