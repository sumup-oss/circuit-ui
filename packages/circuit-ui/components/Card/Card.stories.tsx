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

import { action } from '@storybook/addon-actions';

import { Stack } from '../../../../.storybook/components/index.js';
import { Headline } from '../Headline/index.js';
import { Body } from '../Body/index.js';
import { ButtonGroup } from '../ButtonGroup/index.js';

import { Card, CardHeader, CardFooter } from './index.js';

export default {
  title: 'Components/Card',
  component: Card,
  subcomponents: { CardHeader, CardFooter },
};

const Header = () => (
  <Headline size="s" as="h2">
    Card heading
  </Headline>
);

const Content = () => <Body>This is some text showing in my card</Body>;

const Box = () => (
  <div
    style={{
      background: 'var(--cui-bg-highlight)',
      width: '15rem',
      height: '10rem',
    }}
  />
);

export const Base = () => <Card>Content</Card>;

export const Spacings = () => (
  <Stack>
    <Card spacing="mega">
      <Box />
    </Card>
    <Card spacing="giga">
      <Box />
    </Card>
  </Stack>
);

export const WithHeader = () => (
  <Stack>
    <Card>
      <CardHeader>
        <Header />
      </CardHeader>
      <Content />
    </Card>

    <Card>
      <CardHeader
        onClose={action('CloseButton clicked')}
        closeButtonLabel="Close"
      >
        <Header />
      </CardHeader>
      <Content />
    </Card>
  </Stack>
);

export const WithFooter = () => (
  <Stack>
    <Card>
      <Content />
      <CardFooter>
        <ButtonGroup
          align="right"
          actions={{
            primary: {
              children: 'Confirm',
            },
            secondary: {
              children: 'Cancel',
            },
          }}
        />
      </CardFooter>
    </Card>

    <Card>
      <Content />
      <CardFooter align="left">
        <ButtonGroup
          align="left"
          actions={{
            primary: {
              children: 'Confirm',
            },
            secondary: {
              children: 'Cancel',
            },
          }}
        />
      </CardFooter>
    </Card>
  </Stack>
);
