/**
 * Copyright 2023, SumUp Ltd.
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

import { Headline } from '../..';

import {
  Skeleton,
  SkeletonContainer,
  SkeletonContainerProps,
} from './Skeleton';

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Base = (args: SkeletonContainerProps) => (
  <SkeletonContainer {...args}>
    <Skeleton>
      <Headline as="h2">Hello!</Headline>
    </Skeleton>
  </SkeletonContainer>
);
Base.args = {
  isLoading: true,
};
