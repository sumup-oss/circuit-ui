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

import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Headline from '../../../Headline';
import Image from '../../../Image';
import { spacing } from '../../../../styles/style-mixins';

import Slide from './Slide';

export default {
  title: 'Components/Carousel/Slide',
  component: Slide,
};

const headingStyles = css`
  color: #fff;
  width: 66%;
  position: absolute;
  bottom: 0;
  left: 25px;
  z-index: 2;
`;
const StyledHeadline = styled(Headline)(
  headingStyles,
  spacing({ bottom: 'giga' }),
);

export const OnlyImage = (args) => (
  <Slide {...args}>
    <Image
      src="https://source.unsplash.com/TpHmEoVSmfQ/1600x900"
      alt="Aerial photo of turbulent turquoise ocean waves"
    />
  </Slide>
);

export const TextAndImage = (args) => (
  <Slide {...args}>
    <Image
      src="https://source.unsplash.com/TpHmEoVSmfQ/1600x900"
      alt="Aerial photo of turbulent turquoise ocean waves"
    />
    <StyledHeadline>Get The SumUp Card Reader Today!</StyledHeadline>
  </Slide>
);
