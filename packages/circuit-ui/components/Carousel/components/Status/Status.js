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

import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Body from '../../../Body';
import { typography } from '../../../../styles/style-mixins';

const textStyles = ({ theme }) => css`
  margin-bottom: 0;

  ${theme.mq.untilKilo} {
    ${typography('two')(theme)};
  }
`;
const StyledText = styled(Body)(textStyles);

const Status = ({ step, total, ...props }) => (
  <StyledText variant="highlight" {...props}>
    {step + 1} / {total}
  </StyledText>
);

Status.propTypes = {
  /**
   * Current active index of a carousel.
   */
  step: PropTypes.number,
  /**
   * Total number of slides in a carousel.
   */
  total: PropTypes.number,
};

Status.defaultProps = {
  step: 0,
  total: 0,
};

export default Status;
