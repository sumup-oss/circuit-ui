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

import { ReactNode, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  SwipeableProps,
  useSwipeable,
  SwipeEventData,
  SwipeDirections,
} from 'react-swipeable';

import Image from '../../Image';
import Button from '../../Button';
import ButtonGroup from '../../ButtonGroup';
import Step, { StepProps } from '../Step';
import { StyleProps } from '../../../styles/styled';
import { Actions } from '../types';

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

const sliderImageBaseStyles = ({ theme }: StyleProps) => css`
  width: 100%;
  height: 100%;
  padding: ${theme.spacings.giga};
  transition: transform ${ANIMATION_DURATION}ms ease;
`;

const slideImageTransformStyles = ({
  swipe,
}: {
  swipe: SwipeEventData | null;
}) =>
  swipe?.dir &&
  css`
    transform: translate3d(${swipe.deltaX * -1}px, ${swipe.deltaY * -1}px, 0)
      rotate(${calculateRotationAngle(swipe.dir, swipe.velocity)}deg);
  `;

const SliderImage = styled(Image)(
  sliderImageBaseStyles,
  slideImageTransformStyles,
);

const Swipeable = ({
  children,
  ...props
}: SwipeableProps & {
  children: ReactNode;
}) => {
  const handlers = useSwipeable(props);
  return <div {...handlers}>{children}</div>;
};

interface YesOrNoSliderProps extends StepProps {
  images: string[];
}

export default function YesOrNoSlider({
  images,
  ...stepProps
}: YesOrNoSliderProps): JSX.Element {
  const [swipe, setSwipe] = useState<SwipeEventData | null>(null);
  const handleSwipe = (eventData: SwipeEventData, actions: Actions) => {
    setSwipe(eventData);

    if (eventData.dir === LEFT_DIRECTION) {
      actions.previous();
    }

    if (eventData.dir === RIGHT_DIRECTION) {
      actions.next();
    }

    setTimeout(() => setSwipe(null), ANIMATION_DURATION);
  };

  return (
    <Step totalSteps={images.length} {...stepProps}>
      {({ state, actions, getPreviousControlProps, getNextControlProps }) => (
        <SliderWrapper>
          <Swipeable onSwiped={(eventData) => handleSwipe(eventData, actions)}>
            <SliderImage
              src={images[state.step]}
              alt="A random picture from Unsplash"
              swipe={swipe}
            />
          </Swipeable>
          <ButtonGroup align={'center'}>
            <Button
              variant={swipe?.dir === LEFT_DIRECTION ? 'primary' : 'secondary'}
              {...getPreviousControlProps()}
            >
              No
            </Button>
            <Button
              variant={swipe?.dir === RIGHT_DIRECTION ? 'primary' : 'secondary'}
              {...getNextControlProps()}
            >
              Yes
            </Button>
          </ButtonGroup>
        </SliderWrapper>
      )}
    </Step>
  );
}

function calculateRotationAngle(direction: SwipeDirections, velocity: number) {
  return Math.min(
    30,
    Math.max(
      -30,
      -1 * (direction === LEFT_DIRECTION ? -1 : 1) * velocity * 100,
    ),
  );
}
