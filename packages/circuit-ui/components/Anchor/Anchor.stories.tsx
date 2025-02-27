/**
 * Copyright 2020, SumUp Ltd.
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

import { Anchor, type AnchorProps } from './Anchor.js';

export default {
  title: 'Typography/Anchor',
  component: Anchor,
  tags: ['status:stable'],
  argTypes: {
    href: { control: 'text' },
    children: { control: 'text' },
    as: { control: 'text' },
  },
};

export const AsLink = (args: AnchorProps) => <Anchor {...args} />;

AsLink.args = {
  href: 'https://opensource.sumup.com',
  children: "View SumUp's OSS projects",
};

export const AsButton = (args: AnchorProps) => <Anchor {...args} />;

AsButton.args = {
  onClick: () => alert('Hello'),
  children: 'Say hello',
};
