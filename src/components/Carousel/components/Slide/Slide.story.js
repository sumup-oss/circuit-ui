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

import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Heading from '../../../Heading';
import Image from '../../../Image';
import Slide from './Slide';

const headingStyles = css`
  color: #fff;
  width: 50%;
  position: absolute;
  bottom: 0;
  left: 25px;
  z-index: 2;
`;
const StyledHeading = styled(Heading)(headingStyles);

export default {
  title: 'Components/Carousel/Slide',
  component: Slide,
  parameters: {
    jest: ['Carousel/Slide']
  }
};

export const onlyImage = () => (
  <div style={{ width: '50vw' }}>
    <Slide>
      <Image src="https://placedog.net/800/600" alt="random puppy" />
    </Slide>
  </div>
);

export const textAndImage = () => (
  <div style={{ width: '50vw' }}>
    <Slide>
      <Image src="https://placedog.net/800/600" alt="random puppy" />
      <StyledHeading size="exa">Get The SumUp Card Reader Today!</StyledHeading>
    </Slide>
  </div>
);
