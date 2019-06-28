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
import { flow } from 'lodash/fp';
import { setStatic } from 'recompose';

import withKeyboardEvents from '../../../../util/withKeyboardEvents';
import { sizes } from '../../../../styles/constants';
import { Wrapper } from './components';
import withAriaSelected from '../../../../util/withAriaSelected';

const { KILO, MEGA, GIGA } = sizes;

const Item = ({ children, ...props }) => (
  <Wrapper tabIndex={0} {...props}>
    {children}
  </Wrapper>
);

Item.propTypes = {
  /**
   * When true, shows the item with selected styles.
   */
  selected: PropTypes.bool,
  /**
   * A Circuit UI spacings size.
   */
  padding: PropTypes.oneOf([KILO, MEGA, GIGA]),
  /**
   * Content of the list item.
   */
  children: PropTypes.node.isRequired
};

Item.defaultProps = {
  padding: Item.GIGA,
  selected: false
};

/**
 * @component
 */
export default flow(
  withKeyboardEvents,
  withAriaSelected,
  setStatic('KILO', KILO),
  setStatic('MEGA', MEGA),
  setStatic('GIGA', GIGA)
)(Item);
