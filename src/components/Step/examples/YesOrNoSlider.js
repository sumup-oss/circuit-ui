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

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Swipeable } from 'react-swipeable';

import Image from '../../Image';
import Button from '../../Button';
import ButtonGroup from '../../ButtonGroup';
import Step from '../Step';

const SLIDE_WIDTH = 400;
const ANIMATION_DURATION = 200;
const LEFT_DIRECTION = 'Left';
const RIGHT_DIRECTION = 'Right';

const sliderWrapperStyles = css`
  margin: 0 auto;
  overflow: hidden;
  width: ${SLIDE_WIDTH}px;
`;
const SliderWrapper = styled('div')(sliderWrapperStyles);

const sliderImageBaseStyles = ({ theme }) => css`
  width: 100%;
  height: 100%;
  padding: ${theme.spacings.giga};
  transition: transform ${ANIMATION_DURATION}ms ease;
`;
const slideImageTransformStyles = ({ swipe }) =>
  swipe.dir &&
  css`
    transform: translate3d(${swipe.deltaX * -1}px, ${swipe.deltaY * -1}px, 0)
      rotate(${calculateRotationAngle(swipe.dir, swipe.velocity)}deg);
  `;
const SliderImage = styled(Image)(
  sliderImageBaseStyles,
  slideImageTransformStyles
);

const YesOrNoSlider = ({ images, ...stepProps }) => {
  const [swipe, setSwipe] = useState({});
  const handleSwipe = (eventData, actions) => {
    setSwipe(eventData);

    if (eventData.dir === LEFT_DIRECTION) {
      actions.previous();
    }

    if (eventData.dir === RIGHT_DIRECTION) {
      actions.next();
    }

    setTimeout(() => setSwipe({}), ANIMATION_DURATION);
  };

  return (
    <Step totalSteps={images.length} {...stepProps}>
      {({ state, actions, getPreviousControlProps, getNextControlProps }) => (
        <SliderWrapper>
          <Swipeable onSwiped={eventData => handleSwipe(eventData, actions)}>
            <SliderImage
              src={images[state.step]}
              alt="random pic"
              swipe={swipe}
            />
          </Swipeable>
          <ButtonGroup align={ButtonGroup.CENTER}>
            <Button
              primary={swipe.dir === LEFT_DIRECTION}
              {...getPreviousControlProps()}
            >
              No
            </Button>
            <Button
              primary={swipe.dir === RIGHT_DIRECTION}
              {...getNextControlProps()}
            >
              Yes
            </Button>
          </ButtonGroup>
        </SliderWrapper>
      )}
    </Step>
  );
};
YesOrNoSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string)
};

function calculateRotationAngle(direction, velocity) {
  return Math.min(
    30,
    Math.max(-30, -1 * (direction === LEFT_DIRECTION ? -1 : 1) * velocity * 100)
  );
}

export default YesOrNoSlider;
