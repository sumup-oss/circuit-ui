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

import { useState, Fragment } from 'react';
import { ArrowLeft, ExternalLink } from '@sumup-oss/icons';

import { Body } from '../Body/index.js';
import { Headline } from '../Headline/index.js';
import { Button } from '../Button/index.js';
import { modes } from '../../../../.storybook/modes.js';

import type { TabsProps } from './Tabs.js';
import { Tabs } from './Tabs.js';
import { TabList } from './components/TabList/TabList.js';
import { TabPanel } from './components/TabPanel/TabPanel.js';
import { Tab } from './components/Tab/Tab.js';

export default {
  title: 'Navigation/Tabs',
  component: Tabs,
  subcomponents: { TabList, TabPanel, Tab },
  tags: ['status:under-review'],
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      modes: {
        mobile: modes.smallMobile,
        desktop: modes.desktop,
      },
    },
  },
};

const ContentWithInteractiveElements = ({ index }: { index: number }) => (
  <div
    style={{
      padding: 'var(--cui-spacings-giga',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--cui-spacings-kilo)',
    }}
  >
    <Headline as="h2">Content of tab {index}</Headline>
    <Body>
      Lorem ipsum dolor amet swag pickled humblebrag retro farm-to-table,
      shoreditch typewriter deep v single-origin coffee green juice coloring
      book venmo chambray. Marfa authentic blue bottle mixtape tofu adaptogen.
      IPhone chia blog palo santo mlkshk tattooed jean shorts yr locavore ennui
      scenester. Wolf tousled pok pok sartorial scenester man bun salvia quinoa
      raclette sriracha roof party pour-over venmo hammock. Four dollar toast
      typewriter 3 wolf moon letterpress disrupt pabst. Neutra irony tousled
      iPhone banh mi wayfarers hoodie waistcoat.
    </Body>
    <Button icon={ArrowLeft} variant="secondary">
      Home page
    </Button>
    <Button variant="primary" navigationIcon={ExternalLink}>
      Learn more
    </Button>
  </div>
);

const tabs = [
  {
    id: 'one',
    tab: 'Tab 1',
    panel: <ContentWithInteractiveElements index={1} />,
  },
  {
    id: 'two',
    tab: 'Tab 2',
    panel: <ContentWithInteractiveElements index={2} />,
  },
  {
    id: 'three',
    tab: 'Tab 3',
    panel: <ContentWithInteractiveElements index={3} />,
  },
  {
    id: 'four',
    tab: 'Tab 4',
    panel: <ContentWithInteractiveElements index={4} />,
  },
  {
    id: 'five',
    tab: 'Tab 5',
    panel: <ContentWithInteractiveElements index={5} />,
  },
  {
    id: 'six',
    tab: 'Tab 6',
    panel: <ContentWithInteractiveElements index={6} />,
  },
];

export const Base = (args: TabsProps) => <Tabs {...args} />;

Base.args = {
  items: tabs,
  stretched: false,
};

export const Stretched = (args: TabsProps) => <Tabs {...args} />;

Stretched.args = {
  items: tabs,
  stretched: true,
};

export const Links = () => (
  <TabList>
    <Tab selected>Home</Tab>
    <Tab href="#posts" target="">
      Posts
    </Tab>
    <Tab href="#reviews">Reviews</Tab>
  </TabList>
);

Links.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const ControlledState = () => {
  const [selected, setSelected] = useState(0);

  return (
    <Fragment>
      <TabList>
        {tabs.map(({ tab }, index) => (
          <Tab
            key={tab}
            selected={index === selected}
            onClick={() => setSelected(index)}
          >
            {tab}
          </Tab>
        ))}
      </TabList>
      <TabPanel>{tabs[selected].panel}</TabPanel>
    </Fragment>
  );
};

ControlledState.parameters = {
  controls: { hideNoControlsWarning: true },
};
