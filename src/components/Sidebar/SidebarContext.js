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

import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const SidebarContext = createContext({
  isSidebarOpen: false,
  toggleSidebar: () => {},
});

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
          toggleSidebar: this.toggleSidebar,
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
  children: PropTypes.node,
};

export { SidebarContext, SidebarContextProvider, SidebarContextConsumer };
