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

import React from 'react';
import { select, number, boolean } from '@storybook/addon-knobs';
import { css } from '@emotion/core';

import docs from './ProgressBar.docs.mdx';
import { ProgressBar, ProgressBarProps } from './ProgressBar';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: { page: docs },
    jest: ['ProgressBar']
  }
};

const variants = ['primary', 'secondary'] as const;
const sizes = ['byte', 'kilo', 'mega'] as const;

const BaseProgressBar = (props: ProgressBarProps) => (
  <ProgressBar
    variant={select('Variant', variants, 'primary')}
    size={select('Size', sizes, 'kilo')}
    css={css`
      min-width: 500px;
      max-width: 90%;
    `}
    {...props}
  />
);

export const Steps = () => (
  <BaseProgressBar
    value={number('Value', 3)}
    max={number('Maximum value', 10)}
  />
);

export const Timer = () => (
  <BaseProgressBar
    duration={number('Duration', 3000)}
    paused={boolean('Paused', false)}
    loop={boolean('Loop', true)}
  />
);

export const Labelled = () => {
  const max = number('Maximum value', 10);
  const value = number('Value', 3);
  const fraction = `${value}/${max}`;
  const percentage = `${(value / max) * 100}%`;
  return (
    <>
      <BaseProgressBar value={value} max={max}>
        {fraction}
      </BaseProgressBar>
      <BaseProgressBar value={value} max={max}>
        {percentage}
      </BaseProgressBar>
    </>
  );
};

export const Variants = () => {
  const max = number('Maximum value', 10);
  const value = number('Value', 3);
  return variants.map(variant => (
    <BaseProgressBar key={variant} variant={variant} value={value} max={max}>
      {variant}
    </BaseProgressBar>
  ));
};

export const Sizes = () => {
  const max = number('Maximum value', 10);
  const value = number('Value', 3);
  return sizes.map(size => (
    <BaseProgressBar key={size} size={size} value={value} max={max}>
      {size}
    </BaseProgressBar>
  ));
};
