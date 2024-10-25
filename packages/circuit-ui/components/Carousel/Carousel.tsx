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

'use client';

import { useRef, useState, type ReactNode } from 'react';

import { ProgressBar } from '../ProgressBar/index';
import { Step } from '../Step/index';
import { useComponentSize } from '../../hooks/useComponentSize/index';
import type { ImageProps } from '../Image/index';
import { isFunction } from '../../util/type-check';
import type { Actions, State } from '../Step/types';

import { Container } from './components/Container/index';
import { Slides } from './components/Slides/index';
import { Slide } from './components/Slide/index';
import { SlideImage } from './components/SlideImage/index';
import { Controls } from './components/Controls/index';
import { Status } from './components/Status/index';
import {
  ButtonList,
  NextButton,
  PrevButton,
  PlayButton,
} from './components/Buttons/index';
import {
  ASPECT_RATIO,
  ANIMATION_DURATION,
  SLIDE_DURATION,
  SLIDE_DIRECTIONS,
} from './constants';
import classes from './Carousel.module.css';

export interface CarouselProps {
  /**
   * List of slides to be rendered in a carousel.
   */
  slides: Item[];
  /**
   * Indicates duration of animation between slides (in milliseconds).
   */
  animationDuration?: number;
  /**
   * Indicates time how long each slide will stay visible (in milliseconds).
   */
  slideDuration?: number;
  /**
   * Slide image aspect ratio.
   */
  aspectRatio?: number;
  /**
   * Indicates if carousel should start again after last slide.
   */
  cycle?: boolean;
  /**
   * Make carousel playing immediately after load.
   */
  autoPlay?: boolean;
  /**
   * Optionally remove carousel controls bar under a slide.
   */
  hideControls?: boolean;
  /**
   * Label slide image by returning id string value of a label component (required for accessibility).
   */
  getAriaLabelledBy?: (slide: Item, index: number) => string;
  /**
   * Label for the play action
   */
  playButtonLabel: string;
  /**
   * Label for the pause action
   */
  pauseButtonLabel: string;
  /**
   * Label for the previous action
   */
  prevButtonLabel: string;
  /**
   * Label for the next action
   */
  nextButtonLabel: string;
  /**
   * Add additional components inside a carousel.
   */
  children?:
    | ReactNode
    | ((props: { state: State; actions: Actions }) => ReactNode);
}

type Item = {
  image: ImageProps;
};

export function Carousel({
  slides,
  slideDuration = SLIDE_DURATION,
  animationDuration = ANIMATION_DURATION,
  aspectRatio = ASPECT_RATIO,
  cycle = true,
  autoPlay = true,
  hideControls = false,
  getAriaLabelledBy,
  playButtonLabel,
  pauseButtonLabel,
  prevButtonLabel,
  nextButtonLabel,
  children,
  ...props
}: CarouselProps) {
  const slidesTotal = slides.length;
  const slidesRef = useRef(null);
  const slideSize = useComponentSize(slidesRef);
  const [slideDirection, setSlideDirection] = useState<SLIDE_DIRECTIONS>();

  if (!slidesTotal) {
    return null;
  }

  const handleNextSlide = () => setSlideDirection(SLIDE_DIRECTIONS.FORWARD);
  const handlePreviousSlide = () => setSlideDirection(SLIDE_DIRECTIONS.BACK);

  return (
    <Step
      cycle={cycle}
      autoPlay={autoPlay}
      totalSteps={slidesTotal}
      stepDuration={slideDuration}
      animationDuration={animationDuration}
      onNext={handleNextSlide}
      onPrevious={handlePreviousSlide}
    >
      {({
        state,
        actions,
        getNextControlProps,
        getPreviousControlProps,
        getPlayControlProps,
        getPauseControlProps,
      }) => (
        <Container aria-label="gallery" {...props}>
          <Slides ref={slidesRef}>
            {slides.map((slide, index) => (
              <Slide
                key={slide.image.src}
                index={index}
                step={state.step}
                prevStep={state.previousStep}
                slideSize={slideSize}
                slideDirection={slideDirection}
                animationDuration={animationDuration}
              >
                <SlideImage
                  src={slide.image.src}
                  alt={slide.image.alt}
                  aspectRatio={aspectRatio}
                  aria-labelledby={
                    getAriaLabelledBy ? getAriaLabelledBy(slide, index) : null
                  }
                />
              </Slide>
            ))}
          </Slides>

          {!hideControls && (
            <Controls>
              <Status
                step={state.step}
                total={slidesTotal}
                className={classes.status}
              />

              <ProgressBar
                aria-hidden
                key={state.step}
                size="s"
                loop
                paused={state.paused}
                duration={Math.round(
                  state.stepDuration + state.animationDuration,
                )}
                label={`${state.step + 1} / ${slidesTotal}`}
                hideLabel
                className={classes.progressbar}
              />

              <ButtonList className={classes.buttons}>
                <PlayButton
                  paused={state.paused}
                  {...(state.paused
                    ? getPlayControlProps()
                    : getPauseControlProps())}
                >
                  {state.paused ? playButtonLabel : pauseButtonLabel}
                </PlayButton>
                <PrevButton {...getPreviousControlProps()}>
                  {prevButtonLabel}
                </PrevButton>
                <NextButton {...getNextControlProps()}>
                  {nextButtonLabel}
                </NextButton>
              </ButtonList>
            </Controls>
          )}

          {isFunction(children) ? children({ state, actions }) : children}
        </Container>
      )}
    </Step>
  );
}
