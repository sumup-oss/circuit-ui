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

/** @jsx jsx */
import { Fragment } from 'react';
import { css, jsx } from '@emotion/core';

import docs from './ProgressBar.docs.mdx';
import { ProgressBar, ProgressBarProps } from './ProgressBar';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: { page: docs },
  },
};

const variants = ['primary', 'secondary'] as const;
const sizes = ['byte', 'kilo', 'mega'] as const;

const progressBarStyles = css`
  width: 90%;
  min-width: 500px;
`;

export const Steps = (args: ProgressBarProps) => (
  <ProgressBar {...args} css={progressBarStyles} />
);

Steps.args = {
  label: 'A step-based progressbar',
  hideLabel: true,
  value: 3,
  max: 10,
};

export const Timer = (args: ProgressBarProps) => (
  <ProgressBar {...args} css={progressBarStyles} />
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
  const fraction = `${args.value!}/${args.max!}`;
  const percentage = `${(args.value! / args.max!) * 100}%`;
  return (
    <Fragment>
      <ProgressBar {...args} css={progressBarStyles} label={fraction} />
      <ProgressBar {...args} css={progressBarStyles} label={percentage} />
    </Fragment>
  );
};

Labelled.args = {
  value: 3,
  max: 10,
};

export const Variants = (args: ProgressBarProps) =>
  variants.map((variant) => (
    <ProgressBar
      key={variant}
      {...args}
      variant={variant}
      label={`A ${variant} progressbar`}
      css={progressBarStyles}
    >
      {variant}
    </ProgressBar>
  ));

Variants.args = {
  value: 3,
  max: 10,
};

export const Sizes = (args: ProgressBarProps) =>
  sizes.map((size) => (
    <ProgressBar
      key={size}
      {...args}
      size={size}
      label={`A ${size} progressbar`}
      css={progressBarStyles}
    >
      {size}
    </ProgressBar>
  ));

Sizes.args = {
  value: 3,
  max: 10,
};
