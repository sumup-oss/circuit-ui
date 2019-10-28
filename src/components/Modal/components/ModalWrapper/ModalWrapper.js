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

import Card from '../../../Card';

const baseStyles = ({ theme }) => css`
  width: 100%;

  ${theme.mq.untilKilo} {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    min-width: initial;
    position: relative;
  }
`;

const Wrapper = styled(Card)`
  ${baseStyles};
`;

Wrapper.defaultProps = Card.defaultProps;

const ModalWrapper = ({ ...props }) => (
  <Wrapper shadow={Card.TRIPLE} {...props} />
);

ModalWrapper.propTypes = {
  /*
   * Modal content
   */
  children: PropTypes.node.isRequired
};

/**
 * @component
 */
export default ModalWrapper;
