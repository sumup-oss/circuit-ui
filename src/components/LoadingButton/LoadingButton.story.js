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

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';

import LoadingButton from '.';

// eslint-disable-next-line react/prop-types
const LoadingButtonWithState = ({ exitAnimation, ...props }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <LoadingButton
      {...props}
      isLoading={loading}
      exitAnimation={exitAnimation}
      onClick={handleClick}
    />
  );
};

export default {
  title: 'Components/Button/LoadingButton',
  component: LoadingButton,
  parameters: {
    jest: ['LoadingButton']
  }
};

export const base = () => (
  <LoadingButtonWithState
    onAnimationComplete={action('animation completed')}
    primary
  >
    Things take time
  </LoadingButtonWithState>
);

export const success = () => (
  <LoadingButtonWithState
    onAnimationComplete={action('animation completed')}
    exitAnimation={LoadingButton.SUCCESS}
    primary
  >
    I am a success!
  </LoadingButtonWithState>
);

export const error = () => (
  <LoadingButtonWithState
    onAnimationComplete={action('animation completed')}
    exitAnimation={LoadingButton.ERROR}
    primary
  >
    I will fail.
  </LoadingButtonWithState>
);
