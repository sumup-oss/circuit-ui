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
import React, { useContext } from 'react';

import { render, act, userEvent } from '../../util/test-utils';
import { uniqueId } from '../../util/id';

import { SidePanelProvider, SidePanelContext } from './SidePanelContext';

jest.mock('@sumup/collector', () => ({
  useClickTrigger: () => jest.fn(),
}));

describe('SidePanelContext', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.resetModules();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('SidePanelProvider', () => {
    const panel = {
      backButtonLabel: 'Back',
      children: <p data-testid="children">Side panel content</p>,
      closeButtonLabel: 'Close',
      group: 'primary',
      headline: 'Side panel title',
      id: uniqueId(),
      onClose: undefined,
      tracking: { label: 'test-side-panel' },
    };

    it('should open a side panel', () => {
      const Trigger = () => {
        const { setSidePanel } = useContext(SidePanelContext);
        return <button onClick={() => setSidePanel(panel)}>Open panel</button>;
      };

      const { getByRole, getByText } = render(
        <SidePanelProvider>
          <Trigger />
        </SidePanelProvider>,
      );

      act(() => {
        userEvent.click(getByText('Open panel'));
      });

      expect(getByRole('dialog')).toBeVisible();
    });

    it('should close a side panel', () => {
      const Trigger = () => {
        const { setSidePanel, removeSidePanel } = useContext(SidePanelContext);
        return (
          <>
            <button onClick={() => setSidePanel(panel)}>Open panel</button>
            <button onClick={() => removeSidePanel(panel.group)}>
              Close panel
            </button>
          </>
        );
      };

      const { getByRole, queryByRole, getByText } = render(
        <SidePanelProvider>
          <Trigger />
        </SidePanelProvider>,
      );

      act(() => {
        userEvent.click(getByText('Open panel'));
      });

      expect(getByRole('dialog')).toBeVisible();

      act(() => {
        userEvent.click(getByText('Close panel'));
        jest.runAllTimers();
      });

      expect(queryByRole('dialog')).toBeNull();
    });

    it('should update a side panel', () => {
      const Trigger = () => {
        const { setSidePanel, updateSidePanel } = useContext(SidePanelContext);
        return (
          <>
            <button onClick={() => setSidePanel(panel)}>Open panel</button>
            <button
              onClick={() =>
                updateSidePanel({
                  ...panel,
                  children: <p data-testid="children">Updated content</p>,
                })
              }
            >
              Update panel
            </button>
          </>
        );
      };

      const { getByTestId, getByText } = render(
        <SidePanelProvider>
          <Trigger />
        </SidePanelProvider>,
      );

      act(() => {
        userEvent.click(getByText('Open panel'));
      });

      expect(getByTestId('children')).toHaveTextContent('Side panel content');

      act(() => {
        userEvent.click(getByText('Update panel'));
        jest.runAllTimers();
      });

      expect(getByTestId('children')).toHaveTextContent('Updated content');
    });
  });
});
