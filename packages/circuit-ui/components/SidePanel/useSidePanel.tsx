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

import { useContext, useCallback, useId, useRef, useEffect } from 'react';

import { uniqueId } from '../../util/id.js';

import {
  SidePanelContext,
  type SidePanelContextProps,
} from './SidePanelContext.js';
import type { SidePanelProps } from './SidePanel.js';

export type OnBack = () => void;
export type OnClose = () => void | Promise<void>;

export type ChildrenRenderProps = { onBack?: OnBack; onClose?: OnClose };

export type SidePanelHookProps = Pick<
  SidePanelProps,
  | 'headline'
  | 'backButtonLabel'
  | 'onClose'
  | 'closeButtonLabel'
  | 'locale'
  | 'children'
>;

type SetSidePanel = (props: SidePanelHookProps & SidePanelContextProps) => void;

type UpdateSidePanel = (
  props: Partial<SidePanelHookProps & SidePanelContextProps>,
) => void;

type RemoveSidePanel = (group?: SidePanelContextProps['group']) => void;

type UseSidePanelHook = () => {
  setSidePanel: SetSidePanel;
  updateSidePanel: UpdateSidePanel;
  removeSidePanel: RemoveSidePanel;
  isPrimaryContentResized: boolean;
  transitionDuration: number;
};

export const useSidePanel: UseSidePanelHook = () => {
  const defaultGroup = useId();
  const bottomSidePanelGroupRef = useRef<
    SidePanelContextProps['group'] | undefined
  >();
  const {
    setSidePanel: setSidePanelContext,
    updateSidePanel: updateSidePanelContext,
    removeSidePanel: removeSidePanelContext,
    isPrimaryContentResized,
    transitionDuration,
  } = useContext(SidePanelContext);

  const setSidePanel = useCallback<SetSidePanel>(
    (props) => {
      const sidePanelGroup = props.group || defaultGroup;
      if (!bottomSidePanelGroupRef.current) {
        bottomSidePanelGroupRef.current = sidePanelGroup;
      }
      setSidePanelContext({ ...props, group: sidePanelGroup, id: uniqueId() });
    },
    [setSidePanelContext, defaultGroup],
  );

  const updateSidePanel = useCallback<UpdateSidePanel>(
    (props) => {
      const sidePanelGroup = props.group || defaultGroup;
      updateSidePanelContext({ ...props, group: sidePanelGroup });
    },
    [updateSidePanelContext, defaultGroup],
  );

  const removeSidePanel = useCallback<RemoveSidePanel>(
    (group) => {
      const sidePanelGroup = group || defaultGroup;
      removeSidePanelContext(sidePanelGroup).catch(() => {});
      if (bottomSidePanelGroupRef.current === sidePanelGroup) {
        bottomSidePanelGroupRef.current = undefined;
      }
    },
    [removeSidePanelContext, defaultGroup],
  );

  // Close the side panels when the component that opened them is unmounted.
  // Removing the first one will remove all others stacked on top of it.
  const removeSidePanelRef = useRef(removeSidePanel);
  removeSidePanelRef.current = removeSidePanel;
  useEffect(
    () => () => {
      if (bottomSidePanelGroupRef.current) {
        removeSidePanelRef.current(bottomSidePanelGroupRef.current);
      }
    },
    [],
  );

  return {
    setSidePanel,
    updateSidePanel,
    removeSidePanel,
    isPrimaryContentResized,
    transitionDuration,
  };
};
