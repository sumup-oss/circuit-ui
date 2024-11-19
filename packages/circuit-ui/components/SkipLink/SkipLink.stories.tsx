/**
 * Copyright 2024, SumUp Ltd.
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

import { screen, userEvent } from '@storybook/test';

import { Body } from '../Body/index.js';
import { Headline } from '../Headline/index.js';
import { Anchor, type AnchorProps } from '../Anchor/index.js';

import { SkipLink } from './index.js';

export default {
  title: 'Navigation/SkipLink',
  component: SkipLink,
};

const baseArgs = {
  href: '#main-content',
  children: 'Skip Navigation Links',
};

const focusLink = async () => {
  await userEvent.keyboard('{Tab}');
  await screen.findByRole('link', { name: 'Skip Navigation Links' });
};
export const Base = (args: AnchorProps) => (
  <div style={{ position: 'relative' }}>
    <nav>
      <SkipLink {...args} />
      <Anchor style={{ marginRight: 'var(--cui-spacings-mega)' }} href="#">
        About
      </Anchor>

      <Anchor style={{ marginRight: 'var(--cui-spacings-mega)' }} href="#">
        Join us
      </Anchor>
      <Anchor href="#">Contact</Anchor>
    </nav>

    <main id="main-content" style={{ padding: 'var(--cui-spacings-mega)' }}>
      <Headline as="h2">Main Content</Headline>
      <Body>Press down the Tab key to reveal the skip navigation link.</Body>
    </main>
  </div>
);

Base.args = baseArgs;
Base.play = focusLink;
