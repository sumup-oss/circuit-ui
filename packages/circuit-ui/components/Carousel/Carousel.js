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

import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import ProgressBar from '../ProgressBar';
import Step from '../Step';
import {
  childrenPropType,
  childrenRenderPropType,
} from '../../util/shared-prop-types';
import { useComponentSize } from '../../hooks/useComponentSize';

import Container from './components/Container';
import Slides from './components/Slides';
import Slide from './components/Slide';
import SlideImage from './components/SlideImage';
import Controls from './components/Controls';
import Status from './components/Status';
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

const statusAlignment = ({ theme }) => css`
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

const buttonsAlignment = ({ theme }) => css`
  margin-left: ${theme.spacings.exa};

  ${theme.mq.untilKilo} {
    margin-left: ${theme.spacings.kilo};
  }
`;
const StyledButtonList = styled(ButtonList)(buttonsAlignment);

const Carousel = ({
  slides = [],
  slideDuration = SLIDE_DURATION,
  animationDuration = ANIMATION_DURATION,
  aspectRatio = ASPECT_RATIO,
  cycle = true,
  autoPlay = true,
  hideControls = false,
  getAriaLabelledBy = () => {},
  children,
  tracking,
  ...props
}) => {
  const slidesTotal = slides.length;
  const slidesRef = useRef(null);
  const slideSize = useComponentSize(slidesRef);
  const [slideDirection, setSlideDirection] = useState();

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
      tracking={tracking}
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
                  aria-labelledby={getAriaLabelledBy(slide, index)}
                />
              </Slide>
            ))}
          </Slides>

          {!hideControls && (
            <Controls>
              <StyledStatus step={state.step} total={slidesTotal} />

              <StyledProgressBar
                key={state.step}
                size="byte"
                variant="secondary"
                loop
                paused={state.paused}
                duration={Math.round(
                  state.stepDuration + state.animationDuration,
                )}
              />

              <StyledButtonList>
                <PlayButton
                  paused={state.paused}
                  {...(state.paused
                    ? getPlayControlProps()
                    : getPauseControlProps())}
                />
                <PrevButton {...getPreviousControlProps()} />
                <NextButton {...getNextControlProps()} />
              </StyledButtonList>
            </Controls>
          )}

          {typeof children === 'function'
            ? children({ state, actions })
            : children}
        </Container>
      )}
    </Step>
  );
};

Carousel.propTypes = {
  /**
   * List of slides to be rendered in a carousel.
   */
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.shape({
        /**
         * Specifies the source URL of an image
         */
        src: PropTypes.string.isRequired,
        /**
         * Provides alternative information if a user cannot view the image,
         * e.g. because of slow connection, an error in the src attribute, or if the
         * user uses a screen reader.
         */
        alt: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ),
  /**
   * Indicates duration of animation between slides (in milliseconds).
   */
  animationDuration: PropTypes.number,
  /**
   * Indicates time how long each slide will stay visible (in milliseconds).
   */
  slideDuration: PropTypes.number,
  /**
   * Slide image aspect ratio.
   */
  aspectRatio: PropTypes.number,
  /**
   * Indicates if carousel should start again after last slide.
   */
  cycle: PropTypes.bool,
  /**
   * Make carousel playing immediately after load.
   */
  autoPlay: PropTypes.bool,
  /**
   * Optionally remove carousel controls bar under a slide.
   */
  hideControls: PropTypes.bool,
  /**
   * Label slide image by returning id string value of a label component (required for accessibility).
   */
  getAriaLabelledBy: PropTypes.func,
  /**
   * Add additional components inside a carousel.
   */
  children: PropTypes.oneOfType([childrenPropType, childrenRenderPropType]),
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking: PropTypes.shape({
    label: PropTypes.string.isRequired,
    component: PropTypes.string,
    customParameters: PropTypes.object,
  }),
};

export default Carousel;
