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

'use client';

import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
  type HTMLAttributes,
} from 'react';

import { useStack, type StackItem } from '../../hooks/useStack/index.js';
import { promisify } from '../../util/promises.js';
import { clsx } from '../../styles/clsx.js';
import { useLatest } from '../../hooks/useLatest/useLatest.js';

import { SidePanel, type SidePanelProps } from './SidePanel.js';
import { TRANSITION_DURATION } from './constants.js';
import classes from './SidePanelContext.module.css';
import type { SidePanelHookProps } from './useSidePanel.js';

export type SetSidePanel = (sidePanel: SidePanelContextItem) => void;

export type UpdateSidePanel = (
  sidePanel: Partial<SidePanelHookProps> &
    Pick<Required<SidePanelHookProps>, 'group'>,
) => void;

export type RemoveSidePanel = (
  group: SidePanelHookProps['group'],
  isInstantClose?: boolean,
) => Promise<void>;

export type SidePanelContextItem = SidePanelHookProps &
  Pick<SidePanelProps, 'onCloseEnd'> &
  StackItem & { isInstantOpen?: boolean };

export type SidePanelContextValue = {
  setSidePanel: SetSidePanel;
  updateSidePanel: UpdateSidePanel;
  removeSidePanel: RemoveSidePanel;
  isPrimaryContentResized: boolean;
  transitionDuration: number;
};

export const SidePanelContext = createContext<SidePanelContextValue>({
  setSidePanel: () => {},
  updateSidePanel: () => {},
  removeSidePanel: () => Promise.resolve(),
  isPrimaryContentResized: false,
  transitionDuration: TRANSITION_DURATION,
});

export interface SidePanelProviderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The SidePanelProvider should wrap your entire primary content,
   * which will be resized when the side panel is opened.
   */
  children: ReactNode;
}

export function SidePanelProvider({
  children,
  ...props
}: SidePanelProviderProps) {
  const [sidePanels, dispatch] = useStack<SidePanelContextItem>();
  const [isPrimaryContentResized, setIsPrimaryContentResized] = useState(false);

  const sidePanelsRef = useLatest(sidePanels);

  const findSidePanel = useCallback(
    (group: SidePanelHookProps['group']) =>
      sidePanelsRef.current.find(
        (panel) => panel.group === group && !panel.transition,
      ),
    [sidePanelsRef],
  );

  const removeSidePanel = useCallback<RemoveSidePanel>(
    async (group, isInstantClose) => {
      const panel = findSidePanel(group);

      if (!panel) {
        return;
      }

      const sidePanelIndex = sidePanelsRef.current.indexOf(panel);

      // Remove the side panel and all panels above it in reverse order
      const sidePanelsToRemove = sidePanelsRef.current
        .slice(sidePanelIndex)
        .reverse();

      // The side panels must be closed in series in case an onClose callback
      // rejects to prevent the remaining side panels from closing.
      /* eslint-disable no-await-in-loop */
      for (let index = 0; index < sidePanelsToRemove.length; index += 1) {
        try {
          const sidePanel = sidePanelsToRemove[index];

          if (sidePanel.onClose) {
            await promisify(sidePanel.onClose);
          }

          if (!isInstantClose) {
            setIsPrimaryContentResized(sidePanelIndex !== 0);
          }

          await new Promise<void>((resolve) => {
            const lastPanel = index === sidePanelsToRemove.length - 1;

            // Panels shouldn't wait for the animation of the previous panel to finish.
            // However, `removeSidePanel` should only resolve once the last panel has animated out.
            if (lastPanel) {
              sidePanel.onCloseEnd = resolve;
            } else {
              resolve();
            }

            dispatch({
              type: 'update',
              item: sidePanel,
            });
            dispatch({
              type: 'remove',
              id: sidePanel.id,
              transition: {
                duration: isInstantClose || index > 0 ? 0 : TRANSITION_DURATION,
              },
            });
          });
        } catch (_error) {
          break;
        }
      }
      /* eslint-enable no-await-in-loop */
    },
    [findSidePanel, dispatch, sidePanelsRef],
  );

  const setSidePanel = useCallback<SetSidePanel>(
    (sidePanel) => {
      const panel = findSidePanel(sidePanel.group);

      const pushPanel = (isInstantOpen: boolean) => {
        setIsPrimaryContentResized(true);
        dispatch({
          type: 'push',
          item: { ...sidePanel, isInstantOpen },
        });
      };

      if (panel) {
        removeSidePanel(panel.group, true)
          .then(() => pushPanel(true))
          .catch(() => {});
      } else {
        pushPanel(false);
      }
    },
    [findSidePanel, dispatch, removeSidePanel],
  );

  const updateSidePanel = useCallback<UpdateSidePanel>(
    (sidePanel) => {
      const panel = findSidePanel(sidePanel.group);

      if (panel) {
        dispatch({
          type: 'update',
          item: { ...sidePanel, id: panel.id },
        });
      }
    },
    [findSidePanel, dispatch],
  );

  const context = useMemo(
    () => ({
      setSidePanel,
      updateSidePanel,
      removeSidePanel,
      isPrimaryContentResized,
      transitionDuration: TRANSITION_DURATION,
    }),
    [setSidePanel, updateSidePanel, removeSidePanel, isPrimaryContentResized],
  );

  return (
    <SidePanelContext.Provider value={context}>
      <div
        {...props}
        className={clsx(
          classes.base,
          isPrimaryContentResized && classes.resized,
          props.className,
        )}
      >
        {children}
        {sidePanels.map((sidePanel) => {
          const { group, id, transition, isInstantOpen, ...sidePanelProps } =
            sidePanel;

          const isStacked = group !== sidePanels[0].group;
          const isTopPanel = group === sidePanels[sidePanels?.length - 1].group;
          const handleClose = () => {
            void removeSidePanel(sidePanels[0].group);
          };
          const handleBack = isStacked
            ? () => removeSidePanel(group)
            : undefined;

          return (
            <SidePanel
              {...sidePanelProps}
              key={id}
              open={true}
              animationDuration={isInstantOpen ? 0 : TRANSITION_DURATION}
              onBack={handleBack}
              onClose={handleClose}
              preventEscapeKeyClose={!isTopPanel}
            />
          );
        })}
      </div>
    </SidePanelContext.Provider>
  );
}
