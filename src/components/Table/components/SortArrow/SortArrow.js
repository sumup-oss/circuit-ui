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
import { ChevronUp, ChevronDown } from '@sumup/icons';

import { ASCENDING, DESCENDING } from '../../constants';

const baseStyles = ({ theme }) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40px;
  width: 20px;
  position: absolute;
  left: 0;
  top: 50%;
  opacity: 0;
  transform: translateY(-50%);
  transition: opacity ${theme.transitions.default};
  color: ${theme.colors.p500};
`;

const Wrapper = styled.span(baseStyles);

const iconStyles = theme => css`
  margin-top: -7px;
  margin-bottom: -7px;
`;

/**
 * @private Arrow component for TableHeader sorting
 */
const SortArrow = ({ direction = null }) => (
  <Wrapper>
    {direction !== ASCENDING && <ChevronUp css={iconStyles} />}
    {direction !== DESCENDING && <ChevronDown css={iconStyles} />}
  </Wrapper>
);

SortArrow.propTypes = {
  direction: PropTypes.oneOf([ASCENDING, DESCENDING])
};

export default SortArrow;
