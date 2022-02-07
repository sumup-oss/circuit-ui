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
   * The headline of the side panel.
   */
  headline: string;
  /**
   * Callback function that is called when the side panel is closed.
   */
  onClose?: Callback;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
  /**
   * The type of the side panel. Opening a second side panel with
   * the same `type` will replace the content and close all side panels
   * stacked on top of it. Only panels of different type stack one on top of the other.
   */
  type?: string;
};

type SetSidePanel = (props: SidePanelHookProps) => void;

type UpdateSidePanel = (props: Partial<SidePanelHookProps>) => void;

type RemoveSidePanel = (type?: SidePanelHookProps['type']) => void;

type UseSidePanelHook = () => {
  setSidePanel: SetSidePanel;
  updateSidePanel: UpdateSidePanel;
  removeSidePanel: RemoveSidePanel;
  isPrimaryContentResized: boolean;
  transitionDuration: number;
};

export const useSidePanel: UseSidePanelHook = () => {
  const defaultType = useMemo(uniqueId, []);
  const bottomSidePanelTypeRef =
    useRef<SidePanelContextProps['type'] | undefined>();
  const {
    setSidePanel: setSidePanelContext,
    updateSidePanel: updateSidePanelContext,
    removeSidePanel: removeSidePanelContext,
    isPrimaryContentResized,
    transitionDuration,
  } = useContext(SidePanelContext);

  const setSidePanel = useCallback<SetSidePanel>(
    (props) => {
      const sidePanelType = props.type || defaultType;
      if (!bottomSidePanelTypeRef.current) {
        bottomSidePanelTypeRef.current = sidePanelType;
      }
      setSidePanelContext({ ...props, type: sidePanelType, id: uniqueId() });
    },
    [setSidePanelContext, defaultType],
  );

  const updateSidePanel = useCallback<UpdateSidePanel>(
    (props) => {
      const sidePanelType = props.type || defaultType;
      updateSidePanelContext({ ...props, type: sidePanelType });
    },
    [updateSidePanelContext, defaultType],
  );

  const removeSidePanel = useCallback<RemoveSidePanel>(
    (type) => {
      const sidePanelType = type || defaultType;
      removeSidePanelContext(sidePanelType).catch(() => {});
      if (bottomSidePanelTypeRef.current === sidePanelType) {
        bottomSidePanelTypeRef.current = undefined;
      }
    },
    [removeSidePanelContext, defaultType],
  );

  // Close the side panels when the component that opened them is unmounted.
  // Removing the first one will remove all others stacked on top of it.
  const removeSidePanelRef = useRef(removeSidePanel);
  removeSidePanelRef.current = removeSidePanel;
  useEffect(
    () => () => {
      if (bottomSidePanelTypeRef.current) {
        removeSidePanelRef.current(bottomSidePanelTypeRef.current);
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
