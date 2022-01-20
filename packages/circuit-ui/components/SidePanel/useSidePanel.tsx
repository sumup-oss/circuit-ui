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

import { useContext, useMemo, useCallback, useRef } from 'react';

import { uniqueId } from '../../util/id';

import { SidePanelContext, SidePanelContextProps } from './SidePanelContext';

export const useSidePanel = (): {
  setSidePanel: (props: SidePanelContextProps) => void;
  removeSidePanel: () => void;
} => {
  const id = useMemo(uniqueId, []);
  const sidePanelRef = useRef<SidePanelContextProps | null>(null);
  const context = useContext(SidePanelContext);

  const setSidePanel = useCallback(
    (props: SidePanelContextProps): void => {
      sidePanelRef.current = props;
      context.setSidePanel({ ...props, id });
    },
    [context, id],
  );

  const removeSidePanel = useCallback((): void => {
    if (sidePanelRef.current) {
      context.removeSidePanel({ ...sidePanelRef.current, id });
      sidePanelRef.current = null;
    }
  }, [context, id]);

  return { setSidePanel, removeSidePanel };
};
