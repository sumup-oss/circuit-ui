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

import { Container } from './components/Container/index.js';
import { Controls } from './components/Controls/index.js';
import { Slide } from './components/Slide/index.js';
import { Slides } from './components/Slides/index.js';
import { SlideImage } from './components/SlideImage/index.js';
import { Status } from './components/Status/index.js';
import {
  ButtonList,
  PlayButton,
  NextButton,
  PrevButton,
} from './components/Buttons/index.js';
import { Carousel } from './Carousel.js';

export type { CarouselProps } from './Carousel.js';

export const CarouselComposer = {
  Container,
  Controls,
  Slide,
  Slides,
  SlideImage,
  Status,
  ButtonList,
  PlayButton,
  NextButton,
  PrevButton,
};

export default Carousel;
