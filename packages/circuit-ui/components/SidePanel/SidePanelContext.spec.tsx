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

import {
  Mock,
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { ComponentType, useContext } from 'react';

import {
  render,
  act,
  userEvent as baseUserEvent,
  waitFor,
} from '../../util/test-utils.js';
import { uniqueId } from '../../util/id.js';
import { useMedia } from '../../hooks/useMedia/index.js';

import {
  SidePanelProvider,
  SidePanelContext,
  SetSidePanel,
  RemoveSidePanel,
  UpdateSidePanel,
  SidePanelContextProps,
} from './SidePanelContext.js';

vi.mock('../../hooks/useMedia');

describe('SidePanelContext', () => {
  beforeAll(() => {
    vi.useFakeTimers();

    // HACK: Temporary workaround for a bug in @testing-library/react when
    // using  @testing-library/user-event with fake timers.
    // https://github.com/testing-library/react-testing-library/issues/1197
    const originalJest = globalThis.jest;

    globalThis.jest = {
      ...globalThis.jest,
      advanceTimersByTime: vi.advanceTimersByTime.bind(vi),
    };

    return () => {
      globalThis.jest = originalJest;
    };
  });

  beforeEach(() => {
    (useMedia as Mock).mockReturnValue(false);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.useRealTimers();
    vi.resetModules();
  });

  const userEvent = baseUserEvent.setup({
    advanceTimers: vi.advanceTimersByTime,
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
      // Silences the warning about the missing app element.
      // In user land, the side panel is always rendered by the SidePanelProvider,
      // which takes care of setting the app element.
      // http://reactcommunity.org/react-modal/accessibility/#app-element
      ariaHideApp: false,
    });

    const renderComponent = (Trigger: ComponentType, props = {}) =>
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
    ) => (
      <button
        onClick={() => {
          void hookFn(group);
        }}
      >
        Close panel
      </button>
    );

    const renderUpdateButton = (
      hookFn: UpdateSidePanel,
      props: Partial<SidePanelContextProps> = {},
      group: SidePanelContextProps['group'] = 'primary',
    ) => (
      <button onClick={() => hookFn({ group, ...props })}>Update panel</button>
    );

    it('should merge a custom class name with the default ones', () => {
      const className = 'foo';
      const { container } = render(
        <SidePanelProvider className={className}>
          <span />
        </SidePanelProvider>,
      );
      const button = container.querySelector('div');
      expect(button?.className).toContain(className);
    });

    describe('setSidePanel', () => {
      it('should open a side panel', async () => {
        const Trigger = () => {
          const { setSidePanel } = useContext(SidePanelContext);
          return renderOpenButton(setSidePanel);
        };

        const { getByRole, getByText } = renderComponent(Trigger);

        await userEvent.click(getByText('Open panel'));

        expect(getByRole('dialog')).toBeVisible();
      });

      it('should replace a side panel opened in the same group', async () => {
        const Trigger = () => {
          const { setSidePanel } = useContext(SidePanelContext);
          return renderOpenButton(setSidePanel);
        };

        const { getAllByRole, getByText } = renderComponent(Trigger);

        await userEvent.click(getByText('Open panel'));
        await userEvent.click(getByText('Open panel'));

        await waitFor(() => {
          expect(getAllByRole('dialog')).toHaveLength(1);
        });
      });

      it('should open a second side panel', async () => {
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

        await userEvent.click(getByText('Open panel'));
        await userEvent.click(getByText('Open second panel'));

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

        await userEvent.click(getByText('Open panel'));
        await userEvent.click(getByText('Open second panel'));

        expect(getAllByRole('dialog')).toHaveLength(2);

        await userEvent.click(getByText('Open panel'));

        await waitFor(() => {
          expect(getAllByRole('dialog')).toHaveLength(1);
        });
      });
    });

    describe('removeSidePanel', () => {
      it('should close the side panel', async () => {
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

        await userEvent.click(getByText('Open panel'));

        expect(getByRole('dialog')).toBeVisible();

        await userEvent.click(getByText('Close panel'));

        act(() => {
          vi.runAllTimers();
        });

        expect(queryByRole('dialog')).toBeNull();
      });

      it('should close all side panels stacked above the one being closed', async () => {
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

        await userEvent.click(getByText('Open panel'));
        await userEvent.click(getByText('Open second panel'));

        expect(getAllByRole('dialog')).toHaveLength(2);

        await userEvent.click(getByText('Close panel'));
        act(() => {
          vi.runAllTimers();
        });

        expect(queryByRole('dialog')).toBeNull();
      });

      it('should not close side panels stacked below the one being closed', async () => {
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

        await userEvent.click(getByText('Open panel'));
        await userEvent.click(getByText('Open second panel'));

        expect(getAllByRole('dialog')).toHaveLength(2);

        await userEvent.click(getByText('Close panel'));
        act(() => {
          vi.runAllTimers();
        });

        expect(getAllByRole('dialog')).toHaveLength(1);
      });

      it('should not close the side panel when there is no match', async () => {
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

        await userEvent.click(getByText('Open panel'));

        expect(getByRole('dialog')).toBeVisible();

        await userEvent.click(getByText('Close panel'));
        act(() => {
          vi.runAllTimers();
        });

        expect(getByRole('dialog')).toBeVisible();
      });

      it('should call the onClose callback of the side panel', async () => {
        const onClose = vi.fn();
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

        await userEvent.click(getByText('Open panel'));

        await userEvent.click(getByText('Close panel'));
        act(() => {
          vi.runAllTimers();
        });

        expect(onClose).toHaveBeenCalled();
      });
    });

    describe('updateSidePanel', () => {
      it('should update the side panel', async () => {
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

        await userEvent.click(getByText('Open panel'));

        expect(getByTestId('children')).toHaveTextContent('Side panel content');

        await userEvent.click(getByText('Update panel'));
        act(() => {
          vi.runAllTimers();
        });

        expect(getByTestId('children')).toHaveTextContent('Updated content');
      });

      it('should not update the side panel when there is no match', async () => {
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

        await userEvent.click(getByText('Open panel'));

        expect(getByTestId('children')).toHaveTextContent('Side panel content');

        await userEvent.click(getByText('Update panel'));
        act(() => {
          vi.runAllTimers();
        });

        expect(getByTestId('children')).toHaveTextContent('Side panel content');
      });
    });
  });
});
