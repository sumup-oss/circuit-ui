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
import isPropValid from '@emotion/is-prop-valid';

import { childrenPropType } from '../../../../util/shared-prop-types';

/**
 * A barebones Link component that's basically just an `<a>` tag
 */
const Link = ({ children, ...props }) => (
  <a {...filterValidProps(props)}>{children}</a>
);

function filterValidProps(props) {
  const INVALID_HTML_ATTRIBUTES = ['size', 'disabled', 'selected'];
  const result = {};

  Object.keys(props).forEach(key => {
    if (isPropValid(key) && !INVALID_HTML_ATTRIBUTES.includes(key)) {
      result[key] = props[key];
    }
  });

  return result;
}

Link.propTypes = {
  children: childrenPropType
};

/**
 * @component
 */
export default Link;
