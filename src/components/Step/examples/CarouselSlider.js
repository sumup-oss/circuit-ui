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

/* istanbul ignore file */

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Image from '../../Image';
import Button from '../../Button';
import Step from '../Step';

const SLIDE_WIDTH = 400;

const sliderWrapperStyles = css`
  margin: 0 auto;
  overflow: hidden;
  width: ${SLIDE_WIDTH}px;
`;
const SliderWrapper = styled('div')(sliderWrapperStyles);

const sliderInnerStyles = ({ step, animationDuration }) => css`
  display: flex;
  width: 100%;
  transform: translate3d(${-step * SLIDE_WIDTH}px, 0, 0);
  transition: all ${animationDuration}ms ease-in-out;
`;
const SliderInner = styled('div')(sliderInnerStyles);

const sliderControlsStyles = css`
  display: flex;
  justify-content: center;
`;
const SliderControls = styled('div')(sliderControlsStyles);

const sliderImageStyles = ({ theme, animationDuration }) => css`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: ${SLIDE_WIDTH}px;
  width: 100%;
  height: 100%;
  transition: all ${animationDuration}ms ease-in-out;
  padding: ${theme.spacings.giga};
`;
const SliderImage = styled(Image)(sliderImageStyles);

const buttonStyles = ({ theme }) => css`
  margin: ${theme.spacings.byte};
`;
const SliderButton = styled(Button)(buttonStyles);

const CarouselSlider = ({ images = [], ...stepProps }) => (
  <Step totalSteps={images.length} {...stepProps}>
    {({
      state,
      getNextControlProps,
      getPreviousControlProps,
      getPauseControlProps,
      getPlayControlProps,
    }) => (
      <SliderWrapper>
        <SliderInner
          step={state.step}
          animationDuration={state.animationDuration}
        >
          {images.map((src) => (
            <SliderImage
              key={src}
              src={src}
              alt="random pic"
              animationDuration={state.animationDuration}
            />
          ))}
        </SliderInner>
        <SliderControls>
          <SliderButton {...getPreviousControlProps()}>
            &larr; Prev
          </SliderButton>
          <SliderButton
            variant="primary"
            {...(state.paused ? getPlayControlProps() : getPauseControlProps())}
          >
            {state.paused ? 'Play' : 'Pause'}
          </SliderButton>
          <SliderButton {...getNextControlProps()}>Next &rarr;</SliderButton>
        </SliderControls>
      </SliderWrapper>
    )}
  </Step>
);
CarouselSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

export default CarouselSlider;
