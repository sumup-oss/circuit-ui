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
import { css } from '@emotion/core';

import NotificationBanner from './NotificationBanner';

import { base as Message } from '../Message/Message.story';

export default {
  title: 'Components|Message/NotificationBanner',
  component: NotificationBanner,
  parameters: {
    jest: ['NotificationBanner']
  }
};

export const base = () => (
  <div
    css={css`
      min-height: 5rem;
    `}
  >
    <div
      css={css`
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      `}
    >
      <NotificationBanner>
        <Message />
      </NotificationBanner>
    </div>
  </div>
);
