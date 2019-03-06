import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import TabList from './components/TabList';
import Tab from './components/Tab';
import TabPanel from './components/TabPanel';

class Tabs extends Component {
  static propTypes = {
    initialSelectedIndex: PropTypes.number,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        tab: PropTypes.node.isRequired,
        panel: PropTypes.node.isRequired
      })
    ).isRequired
  };

  static defaultProps = {
    initialSelectedIndex: 0
  };

  state = { selectedIndex: this.props.initialSelectedIndex };

  handleChange = selectedIndex => this.setState({ selectedIndex });

  render() {
    const { items } = this.props;
    const { selectedIndex } = this.state;

    const { tabs, panels } = items.reduce(
      (aggr, { id, tab, panel }, index) => {
        const { tabId, panelId } = getIds(id);
        const tabElement = (
          <Tab
            key={index}
            selected={selectedIndex === index}
            onClick={() => this.handleChange(index)}
            id={tabId}
            aria-controls={panelId}
          >
            {tab}
          </Tab>
        );
        const tabPanelElement = (
          <TabPanel
            key={index}
            id={panelId}
            aria-labelledby={tabId}
            hidden={selectedIndex === index ? undefined : 'hidden'}
          >
            {panel}
          </TabPanel>
        );

        return {
          tabs: [...aggr.tabs, tabElement],
          panels: [...aggr.panels, tabPanelElement]
        };
      },
      { tabs: [], panels: [] }
    );

    return (
      <Fragment>
        <TabList>{tabs}</TabList>
        {panels}
      </Fragment>
    );
  }
}

function getIds(id) {
  return {
    tabId: `tab-${id}`,
    panelId: `panel-${id}`
  };
}

export default Tabs;
