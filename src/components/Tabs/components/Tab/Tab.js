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

import { textMega, focusOutline } from '../../../../styles/style-helpers';

const defaultTabStyles = ({ theme }) => css`
  label: tab;
  ${textMega({ theme })};
  padding: ${theme.spacings.kilo} ${theme.spacings.tera};
  color: ${theme.colors.n700};
  text-decoration: none;
  cursor: pointer;
  background-color: ${theme.colors.white};
  border: none;
  white-space: nowrap;
  height: 100%;
  align-items: center;
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  outline: none;

  &:hover {
    background-color: ${theme.colors.n100};
  }

  &:active {
    background-color: ${theme.colors.n200};
  }

  &:focus {
    ${focusOutline({ theme })};
  }
`;

const selectedTabStyles = ({ theme, selected }) =>
  selected &&
  css`
    label: tab--selected;
    position: relative;
    color: ${theme.colors.n900};

    &::after {
      content: ' ';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: ${theme.spacings.bit};
      background: ${theme.colors.p500};
    }
  `;

const tabIndex = selected => (selected ? undefined : '-1');

/**
 * Tab component that represents a single tab inside a Tabs wrapper
 */
const StyledTab = styled('button')(defaultTabStyles, selectedTabStyles);

const Tab = ({ selected, ...props }) => (
  <StyledTab
    {...props}
    selected={selected}
    aria-selected={selected}
    tabIndex={tabIndex(selected)}
  />
);

Tab.propTypes = {
  /**
   * Triggers selected styles of the component
   */
  selected: PropTypes.bool
};

Tab.defaultProps = {
  selected: false,
  role: 'tab'
};

export { StyledTab };

/**
 * @component
 */
export default Tab;
