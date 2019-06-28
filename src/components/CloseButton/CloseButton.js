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

import { svgKilo } from '../../styles/style-helpers';
import SvgButton from '../SvgButton';
import { ReactComponent as Icon } from './close-icon.svg';

const SvgCloseButton = styled(SvgButton)(
  ({ theme }) => css`
    label: close-button;
    ${svgKilo({ theme })};
  `
);

const labelBaseStyles = () => css`
  ${hideVisually()};
`;

// Important for accessibility
const ButtonLabel = styled('span')`
  ${labelBaseStyles};
`;

/**
 * A generic close button.
 */
const CloseButton = ({ label, ...props }) => (
  <SvgCloseButton {...props}>
    <Icon />
    <ButtonLabel>{label}</ButtonLabel>
  </SvgCloseButton>
);

CloseButton.propTypes = {
  /**
   * Text label for screen readers. Important for accessibility.
   */
  label: PropTypes.string
};

CloseButton.defaultProps = {
  label: 'close'
};

/**
 * @component
 */
export default CloseButton;
