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

import Image from '../../Image/index.js';
import Button from '../../Button/index.js';
import Step, { StepProps } from '../Step.js';

import classes from './CarouselSlider.module.css';

interface CarouselSliderProps extends StepProps {
  images: string[];
}

export default function CarouselSlider({
  images = [],
  ...stepProps
}: CarouselSliderProps) {
  return (
    <Step totalSteps={images.length} {...stepProps}>
      {({
        state,
        getNextControlProps,
        getPreviousControlProps,
        getPauseControlProps,
        getPlayControlProps,
      }) => (
        <div
          className={classes.wrapper}
          style={{
            '--slide-width': '400px',
            '--slide-step': state.step,
            '--slide-animation-duration': `${state.animationDuration}ms`,
          }}
        >
          <div className={classes.inner}>
            {images.map((src) => (
              <Image
                key={src}
                src={src}
                alt="A random picture from Unsplash"
                className={classes.image}
              />
            ))}
          </div>
          <div className={classes.controls}>
            <Button {...getPreviousControlProps()} className={classes.button}>
              &larr; Prev
            </Button>
            <Button
              variant="primary"
              {...(state.paused
                ? getPlayControlProps()
                : getPauseControlProps())}
              className={classes.button}
            >
              {state.paused ? 'Play' : 'Pause'}
            </Button>
            <Button {...getNextControlProps()} className={classes.button}>
              Next &rarr;
            </Button>
          </div>
        </div>
      )}
    </Step>
  );
}
