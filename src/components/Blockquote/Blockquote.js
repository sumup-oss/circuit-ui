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

import { childrenPropType } from '../../util/shared-prop-types';
import Text from '../Text';

const baseStyles = ({ theme }) => css`
  label: blockquote;
  padding-left: ${theme.spacings.kilo};
  border-left: 2px solid ${theme.colors.p500};
`;

const gigaStyles = ({ theme, size }) =>
  size === 'giga' &&
  css`
    label: blockquote--giga;
    padding-left: ${theme.spacings.mega};
    border-left: 3px solid ${theme.colors.p500};
  `;

const StyledText = styled(Text)`
  ${baseStyles};
  ${gigaStyles};
`;

/**
 * Indented and italicised text to denote a quotation.
 */
const Blockquote = ({ children, ...props }) => (
  <StyledText {...props} as="blockquote" italic>
    {children}
  </StyledText>
);

Blockquote.propTypes = {
  /**
   * Child nodes to be rendered.
   */
  children: childrenPropType,
  /**
   * A Circuit UI body text size.
   */
  size: PropTypes.oneOf(['kilo', 'mega', 'giga']).isRequired
};

Blockquote.defaultProps = {
  size: 'kilo'
};

/**
 * @component
 */
export default Blockquote;
