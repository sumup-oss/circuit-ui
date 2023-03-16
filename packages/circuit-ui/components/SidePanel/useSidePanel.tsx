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
  ReactNode,
  useContext,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';

import { uniqueId } from '../../util/id';
import { TrackingProps } from '../../hooks/useClickEvent';

import { SidePanelContext, SidePanelContextProps } from './SidePanelContext';

export type Callback = () => void;

export type ChildrenRenderProps = { onBack?: Callback; onClose: Callback };

export type SidePanelHookProps = {
  /**
   * Text label for the back button for screen readers.
   * Important for accessibility.
   */
  backButtonLabel?: string;
  /**
   * The side panel content. Use a render function when you need access to the
   * `onBack` and `onClose` functions to close the side panel programmatically.
   */
  children: ReactNode | ((props: ChildrenRenderProps) => ReactNode);
  /**
   * Text label for the close button for screen readers.
   * Important for accessibility.
   */
  closeButtonLabel: string;
  /**
   * The group of the side panel. Opening a second side panel in
   * the same group will replace the content and close all side panels
   * stacked on top of it. Only panels in different groups stack one on top of the other.
   */
  group?: string;
  /**
   * The headline of the side panel.
   */
  headline: string;
  /**
   * Callback function that is called when the side panel is closed.
   */
  onClose?: Callback;
  /**
   * @deprecated
   *
   * Dispatch user interaction events when calling `setSidePanel` and `removeSidePanel` instead.
   */
  tracking?: TrackingProps;
};

type SetSidePanel = (props: SidePanelHookProps) => void;

type UpdateSidePanel = (props: Partial<SidePanelHookProps>) => void;

type RemoveSidePanel = (group?: SidePanelHookProps['group']) => void;

type UseSidePanelHook = () => {
  setSidePanel: SetSidePanel;
  updateSidePanel: UpdateSidePanel;
  removeSidePanel: RemoveSidePanel;
  isPrimaryContentResized: boolean;
  transitionDuration: number;
};

export const useSidePanel: UseSidePanelHook = () => {
  const defaultGroup = useMemo(uniqueId, []);
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
