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
import { Preview as StorybookPreview } from '@storybook/addon-docs/blocks';
import { ThemeProvider } from 'emotion-theming';
import { light } from '@sumup/design-tokens';

// eslint-disable-next-line react/prop-types
const Preview = ({ children, ...props }) => (
  <StorybookPreview {...props}>
    <ThemeProvider theme={light}>{children}</ThemeProvider>
  </StorybookPreview>
);

export default Preview;
