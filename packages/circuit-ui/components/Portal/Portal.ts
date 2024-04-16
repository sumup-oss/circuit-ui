/**
 * Copyright 2019, SumUp Ltd.
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

import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  /**
   * The children to render into the container.
   */
  children: ReactNode;
  /**
   * A function that returns a DOM node to which the portal children should be
   * appended. Defaults to `() => document.body`.
   */
  getContainer?: () => Element;
}

/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 */
export function Portal({
  children,
  getContainer = () => document.body,
}: PortalProps): JSX.Element | null {
  const [container, setContainer] = useState<Element | null>(null);

  // `getContainer` likely uses DOM APIs which would throw during server-side
  // rendering. That's why it needs to be run in an effect hook.
  useEffect(() => {
    setContainer(getContainer());
    // In order to prevent performance issues, this hook is only run once.
    // This means that the container can't be changed after the initial render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return container && createPortal(children, container);
}
