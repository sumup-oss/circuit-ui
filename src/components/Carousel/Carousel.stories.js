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

/* eslint-disable react/prop-types */

import React, { useState } from 'react';

import Container from './components/Container';
import Slides from './components/Slides';
import Slide from './components/Slide';
import SlideImage from './components/SlideImage';
import Controls from './components/Controls';
import { ButtonList, NextButton, PrevButton } from './components/Buttons';
import Status from './components/Status';
import Carousel from './Carousel';
import docs from './Carousel.docs.mdx';
import { ASPECT_RATIO, ANIMATION_DURATION, SLIDE_DURATION } from './constants';
import { SLIDES } from './__fixtures__';

export default {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    docs: { page: docs },
  },
};

export const Stateful = (args) => (
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
              key={index}
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
            <PrevButton onClick={goBack} />
            <Status style={{ marginLeft: 8 }} step={step} total={total} />
            <NextButton onClick={goForward} />
          </ButtonList>
        </Controls>
      </Container>
    </div>
  );
};
