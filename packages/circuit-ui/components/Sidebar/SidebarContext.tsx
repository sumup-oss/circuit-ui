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

import { createContext, ReactNode, useState } from 'react';

export const SidebarContext = createContext({
  isSidebarOpen: false,
  toggleSidebar: () => {},
});

export const SidebarContextConsumer = SidebarContext.Consumer;

export interface SidebarContextProviderProps {
  /**
   * The children received by SidebarContextProvider
   */
  children: ReactNode;
}

export function SidebarContextProvider({
  children,
}: SidebarContextProviderProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };
  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
