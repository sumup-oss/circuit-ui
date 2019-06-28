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
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { sizes } from '../../../../styles/constants';

const { BYTE, KILO, MEGA, GIGA } = sizes;

const listStyles = ({ theme, gutter }) => css`
  margin: 0;
  padding: ${theme.spacings[gutter]};
`;

const List = styled(props => {
  const { children, component: Component, subheader, gutter, ...other } = props;

  return (
    <Component {...other}>
      {subheader}
      {children}
    </Component>
  );
})`
  ${listStyles};
`;

List.BYTE = BYTE;
List.KILO = KILO;
List.MEGA = MEGA;
List.GIGA = GIGA;

List.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object
  ]),
  /**
   * The list's gutter
   */
  gutter: PropTypes.oneOf([List.BYTE, List.KILO, List.MEGA, List.GIGA]),
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: PropTypes.node
};

List.defaultProps = {
  children: null,
  component: 'ul',
  subheader: null,
  className: null,
  gutter: List.KILO
};

export default List;
