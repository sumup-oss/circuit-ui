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
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import { useState, type ReactNode } from 'react';
import {
  useSwipeable,
  type SwipeableProps,
  type SwipeEventData,
  type SwipeDirections,
} from 'react-swipeable';

import Image from '../../Image/index.js';
import Button from '../../Button/index.js';
import Step, { type StepProps } from '../Step.js';
import type { Actions } from '../types.js';
import { clsx } from '../../../styles/clsx.js';

import classes from './YesOrNoSlider.module.css';

const ANIMATION_DURATION = 200;
const LEFT_DIRECTION = 'Left';
const RIGHT_DIRECTION = 'Right';

const Swipeable = ({
  children,
  ...props
}: SwipeableProps & {
  children: ReactNode;
}) => {
  const handlers = useSwipeable(props);
  return <div {...handlers}>{children}</div>;
};

export interface YesOrNoSliderProps extends StepProps {
  images: string[];
}

export default function YesOrNoSlider({
  images,
  ...stepProps
}: YesOrNoSliderProps) {
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
        <div
          className={classes.wrapper}
          style={{
            '--slide-animation-duration': `${ANIMATION_DURATION}ms`,
            '--slide-translate-x': `${swipe ? swipe.deltaX * -1 : 0}px`,
            '--slide-translate-y': `${swipe ? swipe.deltaY * -1 : 0}px`,
            '--slide-rotation': `${
              swipe ? calculateRotationAngle(swipe.dir, swipe.velocity) : 0
            }deg`,
          }}
        >
          <Swipeable onSwiped={(eventData) => handleSwipe(eventData, actions)}>
            <Image
              src={images[state.step]}
              alt="A random picture from Unsplash"
              className={clsx(classes.image, swipe?.dir && classes.swipe)}
            />
          </Swipeable>
          <div className={classes.controls}>
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
          </div>
        </div>
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
