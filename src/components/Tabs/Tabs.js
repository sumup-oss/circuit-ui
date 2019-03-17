import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { range } from '../../util/fp';
import { isArrowLeft, isArrowRight, isArrowDown } from '../../util/key-codes';

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

  tabPanelsRefs = createRefs(this.props.items.length);

  handleChange = selectedIndex => this.setState({ selectedIndex });

  handleTabKeyDown = e => {
    const { selectedIndex } = this.state;
    const nextTab = Math.min(this.props.items.length - 1, selectedIndex + 1);
    const previousTab = Math.max(0, selectedIndex - 1);
    const panelRef = this.tabPanelsRefs[selectedIndex].current;

    if (isArrowLeft(e)) {
      this.setState({ selectedIndex: previousTab });
    } else if (isArrowRight(e)) {
      this.setState({ selectedIndex: nextTab });
    } else if (isArrowDown(e)) {
      if (panelRef) {
        panelRef.focus();
      }
    }
  };

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
            onKeyDown={this.handleTabKeyDown}
          >
            {tab}
          </Tab>
        );
        const tabPanelElement = (
          <TabPanel
            key={index}
            id={panelId}
            aria-labelledby={tabId}
            hidden={selectedIndex !== index}
            ref={this.tabPanelsRefs[index]}
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

function createRefs(length) {
  return range(0, length).map(React.createRef);
}

export default Tabs;
