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

import { useState } from 'react';

import { Container } from './components/Container/index.js';
import { Slides } from './components/Slides/index.js';
import { Slide } from './components/Slide/index.js';
import { SlideImage } from './components/SlideImage/index.js';
import { Controls } from './components/Controls/index.js';
import {
  ButtonList,
  NextButton,
  PrevButton,
} from './components/Buttons/index.js';
import { Status } from './components/Status/index.js';
import { Carousel, type CarouselProps } from './Carousel.js';
import {
  ASPECT_RATIO,
  ANIMATION_DURATION,
  SLIDE_DURATION,
} from './constants.js';
import { SLIDES } from './__fixtures__/index.js';

export default {
  title: 'Components/Carousel',
  component: Carousel,
};

export const Stateful = (args: CarouselProps) => (
  <div style={{ width: '50vw' }}>
    <Carousel {...args} />
  </div>
);

Stateful.args = {
  slides: SLIDES,
  slideDuration: SLIDE_DURATION,
  animationDuration: ANIMATION_DURATION,
  aspectRatio: ASPECT_RATIO,
  cycle: true,
  autoPlay: true,
  hideControls: false,
  playButtonLabel: 'Play',
  pauseButtonLabel: 'Pause',
  prevButtonLabel: 'Previous',
  nextButtonLabel: 'Next',
};

export const Composed = () => {
  const total = SLIDES.length;
  const [step, setStep] = useState(0);
  const goBack = () => setStep(step === 0 ? total - 1 : step - 1);
  const goForward = () => setStep(step === total - 1 ? 0 : step + 1);

  return (
    <div style={{ width: '50vw' }}>
      <Container>
        <Slides>
          {SLIDES.map(({ image }, index) => (
            <Slide
              key={image.src}
              index={index}
              step={step}
              style={{
                opacity: step === index ? 1 : 0,
                transition: 'opacity .3s ease-in',
              }}
            >
              <SlideImage src={image.src} alt={image.alt} aspectRatio={2.5} />
            </Slide>
          ))}
        </Slides>
        <Controls>
          <ButtonList>
            <PrevButton label="Previous" onClick={goBack} />
            <Status style={{ marginLeft: 8 }} step={step} total={total} />
            <NextButton label="Next" onClick={goForward} />
          </ButtonList>
        </Controls>
      </Container>
    </div>
  );
};
