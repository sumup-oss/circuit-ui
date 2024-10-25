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

import { Fragment } from 'react';

import { ProgressBar, type ProgressBarProps } from './ProgressBar';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
};

const sizes = ['s', 'm', 'l'] as const;

const progressBarStyles = {
  width: '500px',
  maxWidth: '90vw',
};

export const Steps = (args: ProgressBarProps) => (
  <ProgressBar {...args} style={progressBarStyles} />
);

Steps.args = {
  label: 'A step-based progressbar',
  hideLabel: true,
  value: 3,
  max: 10,
};

export const Timer = (args: ProgressBarProps) => (
  <ProgressBar {...args} style={progressBarStyles} />
);

Timer.args = {
  label: 'A time-based progressbar',
  hideLabel: true,
  duration: 3000,
  paused: false,
  loop: true,
  max: null,
};

export const Labelled = (args: ProgressBarProps) => {
  const fraction = `${args.value}/${args.max}`;
  const percentage = `${((args.value as number) / (args.max as number)) * 100}%`;
  return (
    <Fragment>
      <ProgressBar {...args} style={progressBarStyles} label={fraction} />
      <ProgressBar {...args} style={progressBarStyles} label={percentage} />
    </Fragment>
  );
};

Labelled.args = {
  value: 3,
  max: 10,
};

const sizeNames = {
  s: 'small',
  m: 'medium',
  l: 'large',
};

export const Sizes = (args: ProgressBarProps) =>
  sizes.map((size) => (
    <ProgressBar
      key={size}
      {...args}
      size={size}
      label={`A ${sizeNames[size]} progressbar`}
      style={progressBarStyles}
    />
  ));

Sizes.args = {
  value: 3,
  max: 10,
};
