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
import { hideVisually } from 'polished';

import { textKilo } from '../../styles/style-helpers';

const visuallyHiddenStyles = ({ visuallyHidden }) =>
  visuallyHidden &&
  css`
    ${hideVisually()};
  `;

const baseStyles = ({ theme }) => css`
  label: form-label;
  ${textKilo({ theme })};
  margin-bottom: ${theme.spacings.bit};
  display: block;
`;

/**
 * Label component for forms.
 */
const StyledLabel = styled('label')`
  ${baseStyles};
  ${visuallyHiddenStyles};
`;

const Label = props => <StyledLabel {...props} />;

Label.propTypes = {
  /**
   * The identifier of the corresponding form element.
   */
  htmlFor: PropTypes.string.isRequired,
  visuallyHidden: PropTypes.bool
};

StyledLabel.propTypes = Label.propTypes;

Label.defaultProps = {
  visuallyHidden: false
};

/**
 * @component
 */
export default Label;
