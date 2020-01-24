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
import { action } from '@storybook/addon-actions';

import * as Buttons from './Buttons';

const { ButtonList, PlayButton, NextButton, PrevButton } = Buttons;

export default {
  title: 'Components/Carousel/Buttons',
  component: Buttons,
  parameters: {
    jest: ['Carousel/Buttons']
  }
};

export const allButtons = () => (
  <ButtonList>
    <PlayButton onClick={action('on play click')} />
    <PlayButton paused onClick={action('on pause click')} />
    <PrevButton onClick={action('on previous click')} />
    <NextButton onClick={action('on next click')} />
  </ButtonList>
);
