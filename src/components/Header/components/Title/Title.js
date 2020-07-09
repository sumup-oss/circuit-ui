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

const baseStyles = ({ theme }) => css`
  label: header__title;
  font-size: ${theme.typography.headings.kilo.fontSize};
  line-height: ${theme.typography.headings.kilo.lineHeight};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.n100};
  margin-left: ${theme.spacings.mega};
`;

const Title = styled('h1')(baseStyles);

Title.propTypes = {
  /**
   * The children component passed to the Title
   */
  children: PropTypes.node,
};

/**
 * @component
 */
export default Title;
