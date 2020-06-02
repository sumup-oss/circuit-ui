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

import React, { Fragment } from 'react';
import { select, number } from '@storybook/addon-knobs';
import { css } from '@emotion/core';

import docs from './ProgressBar.docs.mdx';
import { ProgressBar } from './ProgressBar';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: { page: docs },
    jest: ['ProgressBar']
  }
};

const progressBarStyles = css`
  min-width: 500px;
  max-width: 90%;
`;

export const base = () => {
  const size = select('Size', ['kilo', 'mega', 'giga'], 'kilo');
  const max = number('Maximum value', 10);
  const value = number('Value', 3);
  const variant = select('Variant', ['primary', 'secondary'], 'primary');
  return (
    <ProgressBar
      value={value}
      max={max}
      size={size}
      variant={variant}
      css={progressBarStyles}
    />
  );
};

export const withFraction = () => {
  const max = 10;
  const value = 7;
  const children = `${value}/${max}`;
  return (
    <ProgressBar value={value} max={max} css={progressBarStyles}>
      {children}
    </ProgressBar>
  );
};

export const withPercentage = () => {
  const max = 10;
  const value = 7;
  const children = `${(value / max) * 100}%`;
  return (
    <ProgressBar value={value} max={max} css={progressBarStyles}>
      {children}
    </ProgressBar>
  );
};

export const size = () => {
  const max = 10;
  const value = 7;
  const children = `${(value / max) * 100}%`;
  return (
    <Fragment>
      <ProgressBar
        size={'kilo'}
        value={value}
        max={max}
        css={progressBarStyles}
      >
        {children}
      </ProgressBar>
      <ProgressBar
        size={'mega'}
        value={value}
        max={max}
        css={progressBarStyles}
      >
        {children}
      </ProgressBar>
      <ProgressBar
        size={'giga'}
        value={value}
        max={max}
        css={progressBarStyles}
      >
        {children}
      </ProgressBar>
    </Fragment>
  );
};
