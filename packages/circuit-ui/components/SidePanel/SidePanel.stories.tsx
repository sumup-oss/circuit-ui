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
import { within, userEvent } from '@storybook/test';

import { modes } from '../../../../.storybook/modes.js';
import { Body } from '../Body/index.js';
import { Button } from '../Button/index.js';
import { ListItemGroup } from '../ListItemGroup/index.js';
import { ModalProvider } from '../ModalContext/index.js';
import { TopNavigation } from '../TopNavigation/index.js';
import { baseArgs as topNavigationProps } from '../TopNavigation/TopNavigation.stories.js';
import { SideNavigation } from '../SideNavigation/index.js';
import { baseArgs as sideNavigationProps } from '../SideNavigation/SideNavigation.stories.js';

import { SidePanelProvider } from './SidePanelContext.js';
import {
  useSidePanel,
  type ChildrenRenderProps,
  type SidePanelHookProps,
} from './useSidePanel.js';

export default {
  title: 'Navigation/SidePanel',
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      modes: {
        mobile: modes.smallMobile,
        desktop: modes.desktop,
      },
    },
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
  onClose: undefined,
};

const basePlay = async ({
  canvasElement,
}: {
  canvasElement: HTMLCanvasElement;
}) => {
  const canvas = within(canvasElement);
  const thirdItem = canvas.getByText('Item 3', {
    selector: 'button[data-testid="list-item-3"] p',
  });

  await userEvent.click(thirdItem);
};

const StoryInstructions = () => (
  <Body style={{ margin: '1rem' }}>
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
      <Body style={{ marginBottom: '1rem' }}>
        {showMoreInfo
          ? `These are the details of ${label}.`
          : `This is more information about ${label}.`}
      </Body>
      <Body style={{ marginBottom: '1rem' }}>
        {
          'Lorem ipsum dolor amet swag pickled humblebrag retro farm-to-table, shoreditch typewriter deep v single-origin coffee green juice coloring book venmo chambray. Marfa authentic blue bottle mixtape tofu adaptogen. IPhone chia blog palo santo mlkshk tattooed jean shorts yr locavore ennui scenester. Wolf tousled pok pok sartorial scenester man bun salvia quinoa raclette sriracha roof party pour-over venmo hammock. Four dollar toast typewriter 3 wolf moon letterpress disrupt pabst. Neutra irony tousled iPhone banh mi wayfarers hoodie waistcoat.'
        }
      </Body>
      {showMoreInfo && (
        <Button
          type="button"
          variant="primary"
          size="s"
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
          style={{ marginBottom: '1rem' }}
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
              size="s"
              onClick={onBack}
              style={{ marginBottom: '1rem' }}
            >
              Back
            </Button>
          )}
          <Button
            type="button"
            variant="tertiary"
            size="s"
            onClick={onClose}
            style={{ marginBottom: '1rem', marginLeft: '1rem' }}
          >
            Close
          </Button>
        </>
      )}
    </>
  );
};

const ComponentWithSidePanel = (props: SidePanelHookProps) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
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
      style={{ margin: '1rem' }}
    />
  );
};

export const Base = (props: SidePanelHookProps) => (
  <div style={{ display: 'flex' }}>
    <SidePanelProvider>
      <StoryInstructions />
      <ComponentWithSidePanel {...props} />
    </SidePanelProvider>
  </div>
);
Base.args = baseArgs;
Base.play = basePlay;

export const WithTopNavigation = (props: SidePanelHookProps) => {
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
          <SidePanelProvider>
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
  chromatic: {
    modes: {
      mobile: modes.smallMobile,
      tablet: modes.tablet,
      desktop: modes.desktop,
    },
  },
};

const SIDEPANEL_UPDATE_DURATION = 1000;

const ComponentWithSidePanelExtended = (props: SidePanelHookProps) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
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
      style={{ margin: '1rem' }}
    />
  );
};

export const UpdateAndRemove = (props: SidePanelHookProps) => (
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
