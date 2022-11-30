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
import { within, userEvent } from '@storybook/testing-library';

import Body from '../Body';
import Button from '../Button';
import ListItemGroup from '../ListItemGroup';
import { ModalProvider } from '../ModalContext';
import { TopNavigation } from '../TopNavigation';
import { baseArgs as topNavigationProps } from '../TopNavigation/TopNavigation.stories';
import { SideNavigation } from '../SideNavigation';
import { baseArgs as sideNavigationProps } from '../SideNavigation/SideNavigation.stories';
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
    chromatic: { viewports: [320, 960] },
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

const basePlay = ({ canvasElement }: { canvasElement: HTMLCanvasElement }) => {
  const canvas = within(canvasElement);
  const thirdItem = canvas.getByText('Item 3', {
    selector: 'button[data-testid="list-item-3"] p',
  });

  userEvent.click(thirdItem);
};

const StoryInstructions = () => (
  <Body css={spacing('mega')}>
    Select an item to open its details in a side panel. When this story is
    viewed in canvas mode we simulate a selection of the third item.
  </Body>
);

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
    return <Body>{`Loading the details of ${label}...`}</Body>;
  }

  return (
    <>
      <Body css={spacing({ bottom: 'mega' })}>
        {showMoreInfo
          ? `These are the details of ${label}.`
          : `This is more information about ${label}.`}
      </Body>
      <Body css={spacing({ bottom: 'mega' })}>
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

const ComponentWithSidePanel = (props: SidePanelHookProps) => {
  const [selectedItem, setSelectedItem] = useState<string>(null);
  const { setSidePanel } = useSidePanel();

  return (
    <ListItemGroup
      items={items.map((item) => ({
        ...item,
        'variant': 'navigation',
        'selected': item.key === selectedItem,
        'onClick': () => {
          setSidePanel({
            ...props,
            children: <DefaultChildren label={item.label} showMoreInfo />,
            onClose: () => setSelectedItem(null),
          });
          setSelectedItem(item.key);
        },
        'data-testid': `list-item-${item.key}`,
      }))}
      label="List of items with details in a side panel"
      hideLabel
      css={spacing('mega')}
    />
  );
};

export const Base = (props: SidePanelHookProps): JSX.Element => (
  <div style={{ display: 'flex' }}>
    <SidePanelProvider>
      <StoryInstructions />
      <ComponentWithSidePanel {...props} />
    </SidePanelProvider>
  </div>
);
Base.args = baseArgs;
Base.play = basePlay;

export const WithTopNavigation = (props: SidePanelHookProps): JSX.Element => {
  const [isSideNavigationOpen, setSideNavigationOpen] = useState(false);
  const hamburger = {
    activeLabel: 'Close side navigation',
    inactiveLabel: 'Open side navigation',
    isActive: isSideNavigationOpen,
    onClick: () => setSideNavigationOpen((prev) => !prev),
  };
  return (
    <ModalProvider>
      <TopNavigation {...topNavigationProps} hamburger={hamburger} />
      <div style={{ display: 'flex' }}>
        <SideNavigation
          {...sideNavigationProps}
          isOpen={isSideNavigationOpen}
          onClose={() => setSideNavigationOpen(false)}
        />
        <div style={{ flex: '1' }}>
          <SidePanelProvider withTopNavigation>
            <StoryInstructions />
            <ComponentWithSidePanel {...props} />
          </SidePanelProvider>
        </div>
      </div>
    </ModalProvider>
  );
};
WithTopNavigation.storyName = 'With TopNavigation';
WithTopNavigation.args = baseArgs;
WithTopNavigation.play = basePlay;
WithTopNavigation.parameters = {
  chromatic: { viewports: [320, 960, 1280] },
};

const SIDEPANEL_UPDATE_DURATION = 1000;

const ComponentWithSidePanelExtended = (props: SidePanelHookProps) => {
  const [selectedItem, setSelectedItem] = useState<string>(null);
  const { setSidePanel, updateSidePanel, removeSidePanel } = useSidePanel();

  return (
    <ListItemGroup
      items={items.map((item) => ({
        ...item,
        'variant': 'navigation',
        'selected': item.key === selectedItem,
        'onClick': () => {
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
            }, SIDEPANEL_UPDATE_DURATION);
          }
        },
        'data-testid': `list-item-${item.key}`,
      }))}
      label="List of items with details in a side panel"
      hideLabel
      css={spacing('mega')}
    />
  );
};

export const UpdateAndRemove = (props: SidePanelHookProps): JSX.Element => (
  <div style={{ display: 'flex' }}>
    <SidePanelProvider>
      <StoryInstructions />
      <ComponentWithSidePanelExtended {...props} />
    </SidePanelProvider>
  </div>
);
UpdateAndRemove.args = baseArgs;
UpdateAndRemove.play = basePlay;
UpdateAndRemove.parameters = {
  chromatic: { delay: SIDEPANEL_UPDATE_DURATION },
};
