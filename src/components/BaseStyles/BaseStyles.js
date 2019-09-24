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
import PropTypes from 'prop-types';
import { Global } from '@emotion/core';

import { deprecatedPropType } from '../../util/shared-prop-types';

import { createBaseStyles } from './BaseStylesService';

const BaseStyles = ({ custom }) => (
  <Global styles={theme => createBaseStyles(theme, custom)} />
);

BaseStyles.propTypes = {
  custom: deprecatedPropType(
    PropTypes.string,
    [
      'The "custom" prop has been deprecated.',
      `Use Emotion's <Global /> component instead:`,
      `https://emotion.sh/docs/globals`
    ].join(' ')
  )
};

export default BaseStyles;
