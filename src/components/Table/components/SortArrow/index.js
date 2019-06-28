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

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { ReactComponent as ArrowIcon } from './arrow.svg';

import SvgButton from '../../../SvgButton';
import { ASCENDING, DESCENDING } from '../../constants';

const baseStyles = ({ theme }) => css`
  display: flex;
  flex-direction: column;
  height: 10px;
  left: ${theme.spacings.kilo};
  opacity: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: opacity ${theme.transitions.default};
  width: 5px;
`;

const StyledWrapper = styled(SvgButton)`
  ${baseStyles};
`;

const DownArrow = styled(ArrowIcon)`
  margin-top: 2px;
  transform: rotate(180deg);
`;

/**
 * [PRIVATE] Arrow component for TableHeader sorting
 */
const SortArrow = ({ direction }) => (
  <StyledWrapper>
    <Fragment>
      {direction !== DESCENDING && <ArrowIcon />}
      {direction !== ASCENDING && <DownArrow />}
    </Fragment>
  </StyledWrapper>
);

SortArrow.propTypes = {
  direction: PropTypes.oneOf([ASCENDING, DESCENDING])
};

SortArrow.defaultProps = {
  direction: null
};

export default SortArrow;
