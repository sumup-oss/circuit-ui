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

import { createElement } from 'react';
import PropTypes from 'prop-types';

const isFunction = val => typeof val === 'function';

const filterProps = (blacklist, props) =>
  Object.keys(props).reduce((filteredProps, prop) => {
    if (blacklist[prop]) {
      return filteredProps;
    }
    // eslint-disable-next-line no-param-reassign
    filteredProps[prop] = props[prop];
    return filteredProps;
  }, {});

const HtmlElement = ({
  element,
  children,
  blacklist,
  deepRef,
  ...unfilteredProps
}) => {
  const type = isFunction(element) ? element(unfilteredProps) : element;
  const filteredProps = filterProps(blacklist, unfilteredProps);
  const ref = deepRef || undefined;
  return createElement(type, { ...filteredProps, ref }, children);
};

HtmlElement.propTypes = {
  /**
   * The HTML element that should be returned. If a function is passed,
   * the function needs to return a string for an HTML element (i.e., 'button').
   * The function is called with all component props except "element" and "children".
   * See the Button component for an example of how to use this.
   */
  element: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * A hash of props that should not be forwarded as attributes to the HTML element.
   * Prevents React from complaining about invalid attribute values.
   */
  blacklist: PropTypes.objectOf(PropTypes.bool),
  /**
   * Child nodes to be rendered.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  /**
   * Same as the React ref. We need to use this because innerRef is already
   * used by styled.
   */
  deepRef: PropTypes.func
};

HtmlElement.defaultProps = {
  blacklist: {},
  children: null,
  element: 'div',
  deepRef: null
};

/**
 * @component
 */
export default HtmlElement;
