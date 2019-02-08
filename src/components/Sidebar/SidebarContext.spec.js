import React from 'react';
import {
  SidebarContextProvider,
  SidebarContextConsumer
} from './SidebarContext';

describe('SidebarContext', () => {
  it('should change Provider open state when using toggleSidebar', () => {
    const wrapper = mount(
      <SidebarContextProvider>
        <SidebarContextConsumer>
          {({ toggleSidebar }) => (
            <button data-selector="child" onClick={toggleSidebar} />
          )}
        </SidebarContextConsumer>
      </SidebarContextProvider>
    );
    const actual = wrapper.find('[data-selector="child"]');

    actual.simulate('click');
    expect(wrapper.instance().state.isSidebarOpen).toEqual(true);
  });
});
