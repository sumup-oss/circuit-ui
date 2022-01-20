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

import { Fragment } from 'react';

import Button from '../Button';
import Headline from '../Headline';
import Body from '../Body';
import { ModalProvider } from '../ModalContext';
import { spacing } from '../../styles/style-mixins';

import docs from './SidePanel.docs.mdx';
import { SidePanelContextProps, SidePanelProvider } from './SidePanelContext';
import { useSidePanel } from './useSidePanel';
import { SidePanel } from './SidePanel';

export default {
  title: 'Components/SidePanel',
  component: SidePanel,
  subcomponents: { SidePanelProvider },
  parameters: {
    layout: 'fullscreen',
    docs: { page: docs },
  },
};

const DefaultChildren = () => {
  const { setSidePanel } = useSidePanel();
  return (
    <Fragment>
      <Headline as="h2" size="four" noMargin css={spacing({ bottom: 'giga' })}>
        Hello World!
      </Headline>
      <Body noMargin css={spacing({ bottom: 'mega' })}>
        I am a side panel.
      </Body>
      <Button
        type="button"
        onClick={() =>
          setSidePanel({
            children: <Body noMargin>I am a second side panel.</Body>,
            closeButtonLabel: 'Close side panel',
          })
        }
      >
        Open second side panel
      </Button>
    </Fragment>
  );
};

export const Base = (props: SidePanelContextProps): JSX.Element => {
  const ComponentWithSidePanel = () => {
    const { setSidePanel } = useSidePanel();

    return (
      <Button
        type="button"
        onClick={() => setSidePanel(props)}
        css={spacing('mega')}
      >
        Open side panel
      </Button>
    );
  };
  return (
    <ModalProvider>
      <SidePanelProvider>
        <ComponentWithSidePanel />
      </SidePanelProvider>
    </ModalProvider>
  );
};

Base.args = {
  children: DefaultChildren,
  closeButtonLabel: 'Close side panel',
} as SidePanelContextProps;
