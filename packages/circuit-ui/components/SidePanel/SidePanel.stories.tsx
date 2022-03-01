/**
 * Copyright 2022, SumUp Ltd.
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

import { useState } from 'react';

import Body from '../Body';
import Button from '../Button';
import ListItemGroup from '../ListItemGroup';
import { TopNavigation } from '../TopNavigation';
import { baseArgs as topNavigationProps } from '../TopNavigation/TopNavigation.stories';
import { spacing } from '../../styles/style-mixins';

import docs from './SidePanel.docs.mdx';
import { SidePanelProvider } from './SidePanelContext';
import {
  useSidePanel,
  ChildrenRenderProps,
  SidePanelHookProps,
} from './useSidePanel';

export default {
  title: 'Components/SidePanel',
  parameters: {
    layout: 'fullscreen',
    docs: { page: docs },
  },
  argTypes: {
    backButtonLabel: { control: 'text' },
    group: { control: 'text' },
  },
};

const items = Array.from(Array(10).keys()).map((i) => ({
  key: `${i + 1}`,
  label: `Item ${i + 1}`,
}));

const baseArgs: SidePanelHookProps = {
  backButtonLabel: undefined,
  children: undefined,
  closeButtonLabel: 'Close',
  group: undefined,
  headline: 'Item details',
  onClose: null,
  tracking: undefined,
};

type DefaultChildrenProps = {
  label: string;
  showMoreInfo?: boolean;
  showLoading?: boolean;
  showClose?: boolean;
};

const DefaultChildren = ({
  label,
  showMoreInfo,
  showLoading,
  showClose,
  onBack,
  onClose,
}: DefaultChildrenProps & Partial<ChildrenRenderProps>) => {
  const { setSidePanel } = useSidePanel();

  if (showLoading) {
    return <Body noMargin>{`Loading the details of ${label}...`}</Body>;
  }

  return (
    <>
      <Body noMargin css={spacing({ bottom: 'mega' })}>
        {showMoreInfo
          ? `These are the details of ${label}.`
          : `This is more information about ${label}.`}
      </Body>
      <Body noMargin css={spacing({ bottom: 'mega' })}>
        {
          'Lorem ipsum dolor amet swag pickled humblebrag retro farm-to-table, shoreditch typewriter deep v single-origin coffee green juice coloring book venmo chambray. Marfa authentic blue bottle mixtape tofu adaptogen. IPhone chia blog palo santo mlkshk tattooed jean shorts yr locavore ennui scenester. Wolf tousled pok pok sartorial scenester man bun salvia quinoa raclette sriracha roof party pour-over venmo hammock. Four dollar toast typewriter 3 wolf moon letterpress disrupt pabst. Neutra irony tousled iPhone banh mi wayfarers hoodie waistcoat.'
        }
      </Body>
      {showMoreInfo && (
        <Button
          type="button"
          variant="primary"
          size="kilo"
          onClick={() =>
            setSidePanel({
              ...baseArgs,
              backButtonLabel: 'Back',
              children: (renderProps) => (
                <DefaultChildren
                  label={label}
                  showClose={showClose}
                  {...renderProps}
                />
              ),
              headline: 'More information',
            })
          }
          css={spacing({ bottom: 'mega' })}
        >
          Show more
        </Button>
      )}
      {showClose && (
        <>
          {onBack && (
            <Button
              type="button"
              variant="tertiary"
              size="kilo"
              onClick={onBack}
              css={spacing({ bottom: 'mega' })}
            >
              Back
            </Button>
          )}
          <Button
            type="button"
            variant="tertiary"
            size="kilo"
            onClick={onClose}
            css={spacing({ left: 'mega', bottom: 'mega' })}
          >
            Close
          </Button>
        </>
      )}
    </>
  );
};

const ComponentWithSidePanel = (props) => {
  const [selectedItem, setSelectedItem] = useState<string>(null);
  const { setSidePanel } = useSidePanel();

  return (
    <ListItemGroup
      items={items.map((item) => ({
        ...item,
        variant: 'navigation',
        selected: item.key === selectedItem,
        onClick: () => {
          setSidePanel({
            ...props,
            children: <DefaultChildren label={item.label} showMoreInfo />,
            onClose: () => setSelectedItem(null),
          });
          setSelectedItem(item.key);
        },
      }))}
      label="Select an item to open its details in a side panel"
      css={spacing('mega')}
    />
  );
};

export const Base = (props: SidePanelHookProps): JSX.Element => (
  <SidePanelProvider>
    <ComponentWithSidePanel {...props} />
  </SidePanelProvider>
);
Base.args = baseArgs;

export const WithTopNavigation = (props: SidePanelHookProps): JSX.Element => (
  <>
    <TopNavigation {...topNavigationProps} />
    <SidePanelProvider withTopNavigation>
      <ComponentWithSidePanel {...props} />
    </SidePanelProvider>
  </>
);
WithTopNavigation.args = baseArgs;

const ComponentWithSidePanelExtended = (props) => {
  const [selectedItem, setSelectedItem] = useState<string>(null);
  const { setSidePanel, updateSidePanel, removeSidePanel } = useSidePanel();

  return (
    <ListItemGroup
      items={items.map((item) => ({
        ...item,
        variant: 'navigation',
        selected: item.key === selectedItem,
        onClick: () => {
          if (selectedItem === item.key) {
            setSelectedItem(null);
            removeSidePanel();
          } else {
            setSidePanel({
              ...props,
              children: ({ onClose }) => (
                <DefaultChildren
                  label={item.label}
                  showLoading
                  onClose={onClose}
                />
              ),
              onClose: () => setSelectedItem(null),
            });
            setSelectedItem(item.key);
            setTimeout(() => {
              updateSidePanel({
                children: ({ onClose }) => (
                  <DefaultChildren
                    label={item.label}
                    showMoreInfo
                    showClose
                    onClose={onClose}
                  />
                ),
              });
            }, 1000);
          }
        },
      }))}
      label="Select an item to open its details in a side panel"
      css={spacing('mega')}
    />
  );
};

export const UpdateAndRemove = (props: SidePanelHookProps): JSX.Element => (
  <SidePanelProvider>
    <ComponentWithSidePanelExtended {...props} />
  </SidePanelProvider>
);
UpdateAndRemove.args = baseArgs;
