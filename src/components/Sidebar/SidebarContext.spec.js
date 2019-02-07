import React from 'react';
import {
  SidebarContextProvider,
  SidebarContextConsumer
} from './SidebarContext';

describe('SidebarContext', () => {
  describe('styles', () => {
    it('should render and match the snapshot', () => {
      const actual = create(
        <SidebarContextProvider>
          <SidebarContextConsumer>
            {({ isSidebarOpen, toggleSidebar }) => (
              <div
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            )}
          </SidebarContextConsumer>
        </SidebarContextProvider>
      );
      expect(actual).toMatchSnapshot();
    });
  });

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

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(
        <SidebarContextProvider>
          <SidebarContextConsumer>
            {({ isSidebarOpen, toggleSidebar }) => (
              <div
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            )}
          </SidebarContextConsumer>
        </SidebarContextProvider>
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
