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

import { CloseButton, type CloseButtonProps } from './CloseButton.js';

export default {
  title: 'Components/Button/CloseButton',
  tags: ['status:stable'],
  parameters: {
    component: CloseButton,
  },
};

export const Base = (args: CloseButtonProps) => <CloseButton {...args} />;

Base.args = {
  children: 'Close',
};
