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

import { Container } from './components/Container/index';
import { Controls } from './components/Controls/index';
import { Slide } from './components/Slide/index';
import { Slides } from './components/Slides/index';
import { SlideImage } from './components/SlideImage/index';
import { Status } from './components/Status/index';
import {
  ButtonList,
  PlayButton,
  NextButton,
  PrevButton,
} from './components/Buttons/index';

export { Carousel } from './Carousel';

export type { CarouselProps } from './Carousel';

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
