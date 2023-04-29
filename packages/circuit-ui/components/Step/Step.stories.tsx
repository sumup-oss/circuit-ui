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

import Step from './Step.js';
import CarouselSlider from './examples/CarouselSlider.js';
import YesOrNoSlider from './examples/YesOrNoSlider.js';
import MultiStepForm from './examples/MultiStepForm.js';

const IMAGES = [
  '/images/illustration-waves.jpg',
  '/images/illustration-waves-2.jpg',
  '/images/illustration-waves-3.jpg',
];
const STEP_DURATION = 2000;
const ANIMATION_DURATION = 300;

export default {
  title: 'Components/Step',
  component: Step,
};

const baseArgs = {
  images: IMAGES,
  cycle: true,
  onNext: action('onNext'),
  onPrevious: action('onPrev'),
  onPlay: action('onPlay'),
  onPause: action('onPause'),
  onBeforeChange: action('onBeforeChange'),
  onAfterChange: action('onAfterChange'),
};

export const Slider = (args) => <CarouselSlider {...args} />;

Slider.args = {
  ...baseArgs,
  stepDuration: STEP_DURATION,
  animationDuration: ANIMATION_DURATION,
};

export const Swiper = (args) => <YesOrNoSlider {...args} />;

Swiper.args = baseArgs;

export const Form = (args) => <MultiStepForm {...args} />;

Form.args = baseArgs;
