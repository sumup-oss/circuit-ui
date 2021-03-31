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

import { findIndex } from 'lodash/fp';

import { isArray } from '../../../../util/type-check';

const getSelectedChildIndex = (children) =>
  isArray(children) ? findIndex((child) => child.props.selected, children) : 0;

const getSecondaryChild = (children, visible) => {
  if (!children) {
    return null;
  }

  return isArray(children)
    ? children.map((child) => ({
        ...child,
        props: { ...child.props, secondary: true, visible },
      }))
    : { ...children, props: { ...children.props, secondary: true, visible } };
};

export { getSelectedChildIndex, getSecondaryChild };
