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

import { ReactNode, useRef, useState } from 'react';
import { css } from '@emotion/react';

import ProgressBar from '../ProgressBar';
import Step from '../Step';
import { useComponentSize } from '../../hooks/useComponentSize';
import styled, { StyleProps } from '../../styles/styled';
import { ImageProps } from '../Image';
import { isFunction } from '../../util/type-check';
import { Actions, State } from '../Step/types';

import { Container } from './components/Container';
import { Slides } from './components/Slides';
import { Slide } from './components/Slide';
import { SlideImage } from './components/SlideImage';
import { Controls } from './components/Controls';
import { Status } from './components/Status';
import {
  ButtonList,
  NextButton,
  PrevButton,
  PlayButton,
} from './components/Buttons';
import {
  ASPECT_RATIO,
  ANIMATION_DURATION,
  SLIDE_DURATION,
  SLIDE_DIRECTIONS,
} from './constants';

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

const statusAlignment = ({ theme }: StyleProps) => css`
  flex: none;
  margin-right: ${theme.spacings.exa};

  ${theme.mq.untilKilo} {
    margin-right: ${theme.spacings.kilo};
  }
`;
const StyledStatus = styled(Status)(statusAlignment);

const StyledProgressBar = styled(ProgressBar)`
  flex: 1 1 auto;
`;

const buttonsAlignment = ({ theme }: StyleProps) => css`
  margin-left: ${theme.spacings.exa};

  ${theme.mq.untilKilo} {
    margin-left: ${theme.spacings.kilo};
  }
`;
const StyledButtonList = styled(ButtonList)(buttonsAlignment);

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
                key={index}
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
              <StyledStatus step={state.step} total={slidesTotal} />

              <StyledProgressBar
                aria-hidden
                key={state.step}
                size="byte"
                variant="secondary"
                loop
                paused={state.paused}
                duration={Math.round(
                  state.stepDuration + state.animationDuration,
                )}
                label={`${state.step + 1} / ${slidesTotal}`}
                hideLabel
              />

              <StyledButtonList>
                <PlayButton
                  paused={state.paused}
                  label={state.paused ? playButtonLabel : pauseButtonLabel}
                  {...(state.paused
                    ? getPlayControlProps()
                    : getPauseControlProps())}
                />
                <PrevButton
                  label={prevButtonLabel}
                  {...getPreviousControlProps()}
                />
                <NextButton
                  label={nextButtonLabel}
                  {...getNextControlProps()}
                />
              </StyledButtonList>
            </Controls>
          )}

          {isFunction(children) ? children({ state, actions }) : children}
        </Container>
      )}
    </Step>
  );
}
