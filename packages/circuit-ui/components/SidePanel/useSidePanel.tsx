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

import { useContext, useMemo, useCallback, useRef, useEffect } from 'react';

import { uniqueId } from '../../util/id';

import { SidePanelContext, SidePanelContextProps } from './SidePanelContext';

export type SidePanelHookProps = Omit<SidePanelContextProps, 'type'> & {
  type?: SidePanelContextProps['type'];
};

type SetSidePanel = (props: SidePanelHookProps) => void;

type UpdateSidePanel = (props: Partial<SidePanelHookProps>) => void;

type RemoveSidePanel = (type?: SidePanelHookProps['type']) => void;

type UseSidePanelHook = () => {
  setSidePanel: SetSidePanel;
  updateSidePanel: UpdateSidePanel;
  removeSidePanel: RemoveSidePanel;
  isSidePanelOpen: boolean;
};

export const useSidePanel: UseSidePanelHook = () => {
  const defaultType = useMemo(uniqueId, []);
  const bottomSidePanelTypeRef =
    useRef<SidePanelContextProps['type'] | undefined>();
  const context = useContext(SidePanelContext);

  const setSidePanel = useCallback<SetSidePanel>(
    (props) => {
      const sidePanelType = props.type || defaultType;
      if (!bottomSidePanelTypeRef.current) {
        bottomSidePanelTypeRef.current = sidePanelType;
      }
      context.setSidePanel({ ...props, type: sidePanelType, id: uniqueId() });
    },
    [context, defaultType],
  );

  const updateSidePanel = useCallback<UpdateSidePanel>(
    (props) => {
      const sidePanelType = props.type || defaultType;
      context.updateSidePanel({ ...props, type: sidePanelType });
    },
    [context, defaultType],
  );

  const removeSidePanel = useCallback<RemoveSidePanel>(
    (type) => {
      const sidePanelType = type || defaultType;
      context.removeSidePanel(sidePanelType).catch(() => {});
      if (bottomSidePanelTypeRef.current === sidePanelType) {
        bottomSidePanelTypeRef.current = undefined;
      }
    },
    [context, defaultType],
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
    isSidePanelOpen: context.isSidePanelOpen,
  };
};
