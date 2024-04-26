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
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from 'vitest';
import { useContext, type ComponentType } from 'react';

import {
  render,
  act,
  userEvent as baseUserEvent,
  waitFor,
  screen,
} from '../../util/test-utils.js';
import { uniqueId } from '../../util/id.js';
import { useMedia } from '../../hooks/useMedia/index.js';

import {
  SidePanelProvider,
  SidePanelContext,
  type SetSidePanel,
  type RemoveSidePanel,
  type UpdateSidePanel,
  type SidePanelContextProps,
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
      // eslint-disable-next-line testing-library/no-container
      const wrapper = container.querySelector('div');
      expect(wrapper?.className).toContain(className);
    });

    describe('setSidePanel', () => {
      it('should open a side panel', async () => {
        const Trigger = () => {
          const { setSidePanel } = useContext(SidePanelContext);
          return renderOpenButton(setSidePanel);
        };

        renderComponent(Trigger);

        await userEvent.click(screen.getByText('Open panel'));

        expect(screen.getByRole('dialog')).toBeVisible();
      });

      it('should replace a side panel opened in the same group', async () => {
        const Trigger = () => {
          const { setSidePanel } = useContext(SidePanelContext);
          return renderOpenButton(setSidePanel);
        };

        renderComponent(Trigger);

        await userEvent.click(screen.getByText('Open panel'));
        await userEvent.click(screen.getByText('Open panel'));

        await waitFor(() => {
          expect(screen.getAllByRole('dialog')).toHaveLength(1);
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

        renderComponent(Trigger);

        await userEvent.click(screen.getByText('Open panel'));
        await userEvent.click(screen.getByText('Open second panel'));

        expect(screen.getAllByRole('dialog')).toHaveLength(2);
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

        renderComponent(Trigger);

        await userEvent.click(screen.getByText('Open panel'));
        await userEvent.click(screen.getByText('Open second panel'));

        expect(screen.getAllByRole('dialog')).toHaveLength(2);

        await userEvent.click(screen.getByText('Open panel'));

        await waitFor(() => {
          expect(screen.getAllByRole('dialog')).toHaveLength(1);
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

        renderComponent(Trigger);

        await userEvent.click(screen.getByText('Open panel'));

        expect(screen.getByRole('dialog')).toBeVisible();

        await userEvent.click(screen.getByText('Close panel'));

        act(() => {
          vi.runAllTimers();
        });

        expect(screen.queryByRole('dialog')).toBeNull();
      });

      it('should not close the side panel when the `onClose` callback rejects', async () => {
        const onClose = vi.fn().mockRejectedValue('');
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

        renderComponent(Trigger);

        await userEvent.click(screen.getByText('Open panel'));

        expect(screen.getByRole('dialog')).toBeVisible();

        await userEvent.click(screen.getByText('Close panel'));

        act(() => {
          vi.runAllTimers();
        });

        expect(screen.getByRole('dialog')).toBeVisible();
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

        renderComponent(Trigger);

        await userEvent.click(screen.getByText('Open panel'));
        await userEvent.click(screen.getByText('Open second panel'));

        expect(screen.getAllByRole('dialog')).toHaveLength(2);

        await userEvent.click(screen.getByText('Close panel'));
        act(() => {
          vi.runAllTimers();
        });

        await waitFor(() => {
          expect(screen.queryByRole('dialog')).toBeNull();
        });
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

        renderComponent(Trigger);

        await userEvent.click(screen.getByText('Open panel'));
        await userEvent.click(screen.getByText('Open second panel'));

        expect(screen.getAllByRole('dialog')).toHaveLength(2);

        await userEvent.click(screen.getByText('Close panel'));
        act(() => {
          vi.runAllTimers();
        });

        expect(screen.getAllByRole('dialog')).toHaveLength(1);
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

        renderComponent(Trigger);

        await userEvent.click(screen.getByText('Open panel'));

        expect(screen.getByRole('dialog')).toBeVisible();

        await userEvent.click(screen.getByText('Close panel'));
        act(() => {
          vi.runAllTimers();
        });

        expect(screen.getByRole('dialog')).toBeVisible();
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

        renderComponent(Trigger);

        await userEvent.click(screen.getByText('Open panel'));

        await userEvent.click(screen.getByText('Close panel'));
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

        renderComponent(Trigger);

        await userEvent.click(screen.getByText('Open panel'));

        expect(screen.getByTestId('children')).toHaveTextContent(
          'Side panel content',
        );

        await userEvent.click(screen.getByText('Update panel'));
        act(() => {
          vi.runAllTimers();
        });

        expect(screen.getByTestId('children')).toHaveTextContent(
          'Updated content',
        );
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

        renderComponent(Trigger);

        await userEvent.click(screen.getByText('Open panel'));

        expect(screen.getByTestId('children')).toHaveTextContent(
          'Side panel content',
        );

        await userEvent.click(screen.getByText('Update panel'));
        act(() => {
          vi.runAllTimers();
        });

        expect(screen.getByTestId('children')).toHaveTextContent(
          'Side panel content',
        );
      });
    });
  });
});
