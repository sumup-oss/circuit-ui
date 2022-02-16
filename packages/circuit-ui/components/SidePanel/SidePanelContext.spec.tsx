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

import { render, act, userEvent, waitFor } from '../../util/test-utils';
import { uniqueId } from '../../util/id';
import { useMedia } from '../../hooks/useMedia';

import {
  SidePanelProvider,
  SidePanelContext,
  SetSidePanel,
  RemoveSidePanel,
  UpdateSidePanel,
  SidePanelContextProps,
} from './SidePanelContext';

const mockSendEvent = jest.fn();

jest.mock('@sumup/collector', () => ({
  useClickTrigger: () => mockSendEvent,
}));

jest.mock('../../hooks/useMedia');

describe('SidePanelContext', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    (useMedia as jest.Mock).mockReturnValue(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.resetModules();
  });

  describe('SidePanelProvider', () => {
    const getPanel = () => ({
      backButtonLabel: 'Back',
      children: <p data-testid="children">Side panel content</p>,
      closeButtonLabel: 'Close',
      group: 'primary',
      headline: 'Side panel title',
      id: uniqueId(),
      onClose: undefined,
      tracking: undefined,
    });

    const renderComponent = (Trigger, props = {}) =>
      render(
        <SidePanelProvider {...props}>
          <Trigger />
        </SidePanelProvider>,
      );

    const renderOpenButton = (
      hookFn: SetSidePanel,
      props: Partial<SidePanelContextProps> = {},
      label = 'Open panel',
    ) => (
      <button onClick={() => hookFn({ ...getPanel(), ...props })}>
        {label}
      </button>
    );

    const renderCloseButton = (
      hookFn: RemoveSidePanel,
      group: SidePanelContextProps['group'] = 'primary',
    ) => <button onClick={() => hookFn(group)}>Close panel</button>;

    const renderUpdateButton = (
      hookFn: UpdateSidePanel,
      props: Partial<SidePanelContextProps> = {},
      group: SidePanelContextProps['group'] = 'primary',
    ) => (
      <button onClick={() => hookFn({ group, ...props })}>Update panel</button>
    );

    describe('render', () => {
      it('should render the non-resized container', () => {
        const Trigger = () => {
          const { setSidePanel } = useContext(SidePanelContext);
          return renderOpenButton(setSidePanel);
        };

        const { baseElement } = renderComponent(Trigger);

        expect(baseElement).toMatchSnapshot();
      });

      it('should render the side panel and the resized container', () => {
        const Trigger = () => {
          const { setSidePanel } = useContext(SidePanelContext);
          return renderOpenButton(setSidePanel);
        };

        const { baseElement, getByText } = renderComponent(Trigger);

        act(() => {
          userEvent.click(getByText('Open panel'));
        });

        expect(baseElement).toMatchSnapshot();
      });

      it('should render the side panel on mobile resolutions', () => {
        const Trigger = () => {
          const { setSidePanel } = useContext(SidePanelContext);
          return renderOpenButton(setSidePanel);
        };

        (useMedia as jest.Mock).mockReturnValue(true);

        const { baseElement, getByText } = renderComponent(Trigger);

        act(() => {
          userEvent.click(getByText('Open panel'));
        });

        expect(baseElement).toMatchSnapshot();
      });

      it('should render the side panel with offset for the top navigation', () => {
        const Trigger = () => {
          const { setSidePanel } = useContext(SidePanelContext);
          return renderOpenButton(setSidePanel);
        };

        const { baseElement, getByText } = renderComponent(Trigger, {
          withTopNavigation: true,
        });

        act(() => {
          userEvent.click(getByText('Open panel'));
        });

        expect(baseElement).toMatchSnapshot();
      });
    });

    describe('setSidePanel', () => {
      it('should open a side panel', () => {
        const Trigger = () => {
          const { setSidePanel } = useContext(SidePanelContext);
          return renderOpenButton(setSidePanel);
        };

        const { getByRole, getByText } = renderComponent(Trigger);

        act(() => {
          userEvent.click(getByText('Open panel'));
        });

        expect(getByRole('dialog')).toBeVisible();
      });

      it('should replace a side panel opened in the same group', async () => {
        const Trigger = () => {
          const { setSidePanel } = useContext(SidePanelContext);
          return renderOpenButton(setSidePanel);
        };

        const { getAllByRole, getByText } = renderComponent(Trigger);

        act(() => {
          userEvent.click(getByText('Open panel'));
        });

        act(() => {
          userEvent.click(getByText('Open panel'));
        });

        await waitFor(() => {
          expect(getAllByRole('dialog')).toHaveLength(1);
        });
      });

      it('should open a second side panel', () => {
        const Trigger = () => {
          const { setSidePanel } = useContext(SidePanelContext);
          return (
            <>
              {renderOpenButton(setSidePanel)}
              {renderOpenButton(
                setSidePanel,
                { group: 'secondary' },
                'Open second panel',
              )}
            </>
          );
        };

        const { getAllByRole, getByText } = renderComponent(Trigger);

        act(() => {
          userEvent.click(getByText('Open panel'));
          userEvent.click(getByText('Open second panel'));
        });

        expect(getAllByRole('dialog')).toHaveLength(2);
      });

      it('should close all stacked side panels when opening a panel from a lower group', async () => {
        const Trigger = () => {
          const { setSidePanel } = useContext(SidePanelContext);
          return (
            <>
              {renderOpenButton(setSidePanel)}
              {renderOpenButton(
                setSidePanel,
                { group: 'secondary' },
                'Open second panel',
              )}
            </>
          );
        };

        const { getAllByRole, getByText } = renderComponent(Trigger);

        act(() => {
          userEvent.click(getByText('Open panel'));
          userEvent.click(getByText('Open second panel'));
        });

        expect(getAllByRole('dialog')).toHaveLength(2);

        act(() => {
          userEvent.click(getByText('Open panel'));
        });

        await waitFor(() => {
          expect(getAllByRole('dialog')).toHaveLength(1);
        });
      });

      it('should send an open tracking event', () => {
        const Trigger = () => {
          const { setSidePanel } = useContext(SidePanelContext);
          return renderOpenButton(setSidePanel, {
            tracking: { label: 'test-side-panel' },
          });
        };

        const { getByText } = renderComponent(Trigger);

        act(() => {
          userEvent.click(getByText('Open panel'));
        });

        expect(mockSendEvent).toHaveBeenCalledWith({
          component: 'side-panel',
          label: 'test-side-panel|open',
        });
      });
    });

    describe('removeSidePanel', () => {
      it('should close the side panel', () => {
        const Trigger = () => {
          const { setSidePanel, removeSidePanel } =
            useContext(SidePanelContext);
          return (
            <>
              {renderOpenButton(setSidePanel)}
              {renderCloseButton(removeSidePanel)}
            </>
          );
        };

        const { getByRole, queryByRole, getByText } = renderComponent(Trigger);

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

      it('should close all side panel stacked above the one being closed', () => {
        const Trigger = () => {
          const { setSidePanel, removeSidePanel } =
            useContext(SidePanelContext);
          return (
            <>
              {renderOpenButton(setSidePanel)}
              {renderOpenButton(
                setSidePanel,
                { group: 'secondary' },
                'Open second panel',
              )}
              {renderCloseButton(removeSidePanel)}
            </>
          );
        };

        const { getAllByRole, queryByRole, getByText } =
          renderComponent(Trigger);

        act(() => {
          userEvent.click(getByText('Open panel'));
          userEvent.click(getByText('Open second panel'));
        });

        expect(getAllByRole('dialog')).toHaveLength(2);

        act(() => {
          userEvent.click(getByText('Close panel'));
          jest.runAllTimers();
        });

        expect(queryByRole('dialog')).toBeNull();
      });

      it('should not close side panels stacked below the one being closed', () => {
        const Trigger = () => {
          const { setSidePanel, removeSidePanel } =
            useContext(SidePanelContext);
          return (
            <>
              {renderOpenButton(setSidePanel)}
              {renderOpenButton(
                setSidePanel,
                { group: 'secondary' },
                'Open second panel',
              )}
              {renderCloseButton(removeSidePanel, 'secondary')}
            </>
          );
        };

        const { getAllByRole, getByText } = renderComponent(Trigger);

        act(() => {
          userEvent.click(getByText('Open panel'));
          userEvent.click(getByText('Open second panel'));
        });

        expect(getAllByRole('dialog')).toHaveLength(2);

        act(() => {
          userEvent.click(getByText('Close panel'));
          jest.runAllTimers();
        });

        expect(getAllByRole('dialog')).toHaveLength(1);
      });

      it('should not close the side panel when there is no match', () => {
        const Trigger = () => {
          const { setSidePanel, removeSidePanel } =
            useContext(SidePanelContext);
          return (
            <>
              {renderOpenButton(setSidePanel)}
              {renderCloseButton(removeSidePanel, 'secondary')}
            </>
          );
        };

        const { getByRole, getByText } = renderComponent(Trigger);

        act(() => {
          userEvent.click(getByText('Open panel'));
        });

        expect(getByRole('dialog')).toBeVisible();

        act(() => {
          userEvent.click(getByText('Close panel'));
          jest.runAllTimers();
        });

        expect(getByRole('dialog')).toBeVisible();
      });

      it('should call the onClose callback of the side panel', () => {
        const onClose = jest.fn();
        const Trigger = () => {
          const { setSidePanel, removeSidePanel } =
            useContext(SidePanelContext);
          return (
            <>
              {renderOpenButton(setSidePanel, { onClose })}
              {renderCloseButton(removeSidePanel)}
            </>
          );
        };

        const { getByText } = renderComponent(Trigger);

        act(() => {
          userEvent.click(getByText('Open panel'));
        });

        act(() => {
          userEvent.click(getByText('Close panel'));
          jest.runAllTimers();
        });

        expect(onClose).toHaveBeenCalled();
      });

      it('should send a close tracking event', () => {
        const Trigger = () => {
          const { setSidePanel, removeSidePanel } =
            useContext(SidePanelContext);
          return (
            <>
              {renderOpenButton(setSidePanel, {
                tracking: { label: 'test-side-panel' },
              })}
              {renderCloseButton(removeSidePanel)}
            </>
          );
        };

        const { getByRole, getByText } = renderComponent(Trigger);

        act(() => {
          userEvent.click(getByText('Open panel'));
        });

        expect(getByRole('dialog')).toBeVisible();

        act(() => {
          userEvent.click(getByText('Close panel'));
          jest.runAllTimers();
        });

        expect(mockSendEvent).toHaveBeenCalledWith({
          component: 'side-panel',
          label: 'test-side-panel|close',
        });
      });
    });

    describe('updateSidePanel', () => {
      it('should update the side panel', () => {
        const Trigger = () => {
          const { setSidePanel, updateSidePanel } =
            useContext(SidePanelContext);
          return (
            <>
              {renderOpenButton(setSidePanel)}
              {renderUpdateButton(updateSidePanel, {
                children: <p data-testid="children">Updated content</p>,
              })}
            </>
          );
        };

        const { getByTestId, getByText } = renderComponent(Trigger);

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

      it('should not update the side panel when there is no match', () => {
        const Trigger = () => {
          const { setSidePanel, updateSidePanel } =
            useContext(SidePanelContext);
          return (
            <>
              {renderOpenButton(setSidePanel)}
              {renderUpdateButton(
                updateSidePanel,
                {
                  children: <p data-testid="children">Updated content</p>,
                },
                'secondary',
              )}
            </>
          );
        };

        const { getByTestId, getByText } = renderComponent(Trigger);

        act(() => {
          userEvent.click(getByText('Open panel'));
        });

        expect(getByTestId('children')).toHaveTextContent('Side panel content');

        act(() => {
          userEvent.click(getByText('Update panel'));
          jest.runAllTimers();
        });

        expect(getByTestId('children')).toHaveTextContent('Side panel content');
      });
    });
  });
});
