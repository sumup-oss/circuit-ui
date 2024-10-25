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

import * as Buttons from './Buttons';

const { ButtonList, PlayButton, NextButton, PrevButton } = Buttons;

export default {
  title: 'Components/Carousel/Buttons',
  component: Buttons,
};

export const AllButtons = () => (
  <ButtonList>
    <PlayButton onClick={action('on play click')}>Pause</PlayButton>
    <PlayButton paused onClick={action('on pause click')}>
      Play
    </PlayButton>
    <PrevButton onClick={action('on previous click')}>Previous</PrevButton>
    <NextButton onClick={action('on next click')}>Next</NextButton>
  </ButtonList>
);
