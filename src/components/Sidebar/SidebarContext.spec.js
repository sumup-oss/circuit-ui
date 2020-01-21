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

import React, { useContext } from 'react';
import {
  SidebarContext,
  SidebarContextProvider,
  SidebarContextConsumer
} from './SidebarContext';

const ToggleSidebarButton = () => {
  const { toggleSidebar, isSidebarOpen } = useContext(SidebarContext);

  return (
    <button
      data-testid="button"
      onClick={toggleSidebar}
      data-open={isSidebarOpen}
    />
  );
};

describe('SidebarContext', () => {
  it('should change Provider open state when using toggleSidebar', () => {
    const { getByTestId } = render(
      <SidebarContextProvider>
        <SidebarContextConsumer>
          {({ toggleSidebar, isSidebarOpen }) => (
            <button
              type="button"
              data-testid="button"
              onClick={toggleSidebar}
              data-open={isSidebarOpen}
            />
          )}
        </SidebarContextConsumer>
      </SidebarContextProvider>
    );
    const buttonEl = getByTestId('button');

    expect(buttonEl).toHaveAttribute('data-open', 'false');

    act(() => {
      fireEvent.click(buttonEl);
    });

    expect(buttonEl).toHaveAttribute('data-open', 'true');
  });

  it('should be able to consume context, along with useContext hook', () => {
    const { getByTestId } = render(
      <SidebarContextProvider>
        <ToggleSidebarButton />
      </SidebarContextProvider>
    );

    const buttonElement = getByTestId('button');

    expect(buttonElement).toHaveAttribute('data-open', 'false');

    act(() => {
      fireEvent.click(buttonElement);
    });

    expect(buttonElement).toHaveAttribute('data-open', 'true');
  });
});
