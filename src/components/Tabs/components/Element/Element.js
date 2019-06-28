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

/**
 * Basic Element that can be used as underlying component for composition.
 */
const Element = ({ as, deepRef, ...props }) =>
  React.createElement(as, { ...props, ref: deepRef || null });

Element.propTypes = {
  /**
   * Element that needs to be returned.
   * Must be either html element or react component.
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * Ref to be passed to the underlying element.
   */
  deepRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};

Element.defaultProps = {
  as: 'div'
};

/**
 * @component
 */
export default Element;
