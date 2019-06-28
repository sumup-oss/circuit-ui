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

const baseStyles = () => css`
  label: spacing;
`;

const marginBottomStyles = ({ theme, bottom }) =>
  bottom &&
  css`
    label: spacing--margin-bottom;
    margin-bottom: ${theme.spacings.giga};
  `;

const marginTopStyles = ({ theme, top }) =>
  top &&
  css`
    label: spacing--margin-top;
    margin-top: ${theme.spacings.giga};
  `;

/**
 * Margin helper component for default margin usage. The idea is to wrap your
 * visual components with this one in order to add top or bottom spacing based
 * on the theme variables.
 */
const Spacing = styled('div')`
  ${baseStyles};
  ${marginBottomStyles};
  ${marginTopStyles};
`;

Spacing.propTypes = {
  /**
   * Adds bottom margin to component
   */
  bottom: PropTypes.bool,
  /**
   * Adds top margin to component
   */
  top: PropTypes.bool
};

Spacing.defaultProps = {
  bottom: false,
  top: false
};

/**
 * @component
 */
export default Spacing;
