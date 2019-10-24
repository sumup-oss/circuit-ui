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

const baseStyles = () => css`
  label: image;
  display: block;
  height: auto;
  max-height: 100%;
  width: 100%;
`;

const StyledImage = styled('img')(baseStyles);

/**
 * The Image component. Responsive by default.
 */
const Image = props => <StyledImage {...props} />;

Image.propTypes = {
  /**
   * Specifies the source URL of an image
   */
  src: PropTypes.string.isRequired,
  /**
   * Provides alternative information if a user cannot view the image,
   * e.g. because of slow connection, an error in the src attribute, or if the
   * user uses a screen reader.
   */
  alt: PropTypes.string.isRequired
};

/**
 * @component
 */
export default Image;
