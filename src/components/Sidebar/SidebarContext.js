import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const SidebarContext = createContext();

const SidebarContextConsumer = SidebarContext.Consumer;

class SidebarContextProvider extends React.Component {
  state = { isSidebarOpen: false };

  toggleSidebar = () => {
    this.setState(prevState => ({ isSidebarOpen: !prevState.isSidebarOpen }));
  };

  render() {
    return (
      <SidebarContext.Provider
        value={{
          isSidebarOpen: this.state.isSidebarOpen,
          toggleSidebar: this.toggleSidebar
        }}
      >
        {this.props.children}
      </SidebarContext.Provider>
    );
  }
}

SidebarContextProvider.propTypes = {
  /**
   * The children received by SidebarContextProvider
   */
  children: PropTypes.node
};

export { SidebarContextProvider, SidebarContextConsumer };
