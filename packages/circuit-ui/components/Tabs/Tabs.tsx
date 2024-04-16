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

'use client';

import {
  createRef,
  Component,
  Fragment,
  type ReactElement,
  type ReactNode,
} from 'react';

import {
  isArrowLeft,
  isArrowRight,
  isArrowDown,
} from '../../util/key-codes.js';

import { TabList, type TabListProps } from './components/TabList/index.js';
import { Tab } from './components/Tab/index.js';
import { TabPanel } from './components/TabPanel/index.js';

export interface TabsProps extends TabListProps {
  /**
   * The index of the initially selected tab.
   */
  initialSelectedIndex?: number;
  /**
   * A collection of tabs with an id, the tab label, and panel content.
   */
  items: {
    id: string;
    tab: ReactNode;
    panel: ReactNode;
  }[];
}

type TabsState = {
  selectedIndex: number;
};

export class Tabs extends Component<TabsProps, TabsState> {
  static defaultProps = {
    initialSelectedIndex: 0,
  };

  state = {
    selectedIndex:
      this.props.initialSelectedIndex || Tabs.defaultProps.initialSelectedIndex,
  };

  tabPanelsRefs = createRefs(this.props.items.length);

  handleChange = (selectedIndex: number) => this.setState({ selectedIndex });

  handleTabKeyDown = (event: KeyboardEvent | React.KeyboardEvent) => {
    const { selectedIndex } = this.state;
    const nextTab = Math.min(this.props.items.length - 1, selectedIndex + 1);
    const previousTab = Math.max(0, selectedIndex - 1);
    const panelRef = this.tabPanelsRefs[selectedIndex].current;

    if (isArrowLeft(event)) {
      this.setState({ selectedIndex: previousTab });
    } else if (isArrowRight(event)) {
      this.setState({ selectedIndex: nextTab });
    } else if (isArrowDown(event)) {
      if (panelRef) {
        panelRef.focus();
      }
    }
  };

  render() {
    const { items, ...props } = this.props;
    const { selectedIndex } = this.state;
    const { tabs, panels } = items.reduce(
      (aggr, { id, tab, panel }, index) => {
        const { tabId, panelId } = getIds(id);

        const tabElement = (
          <Tab
            key={tabId}
            data-testid="tab-element"
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
            key={tabId}
            data-testid="tab-panel"
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
          panels: [...aggr.panels, tabPanelElement],
        };
      },
      {
        tabs: [],
        panels: [],
      } as {
        tabs: ReactElement[];
        panels: ReactElement[];
      },
    );

    return (
      <Fragment>
        <TabList {...props}>{tabs}</TabList>
        {panels}
      </Fragment>
    );
  }
}

function getIds(id: string) {
  return {
    tabId: `tab-${id}`,
    panelId: `panel-${id}`,
  };
}

function createRefs(length: number) {
  return Array.from(Array(length).keys()).map(() =>
    createRef<HTMLDivElement>(),
  );
}
