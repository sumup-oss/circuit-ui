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

import Image from '../../../Image';
import AspectRatio from '../../../AspectRatio';
import { ASPECT_RATIO } from '../../constants';

const backgroundStyles = ({ theme }) => css`
  label: carousel__slideimage;
  background: ${theme.colors.n100};
`;
const StyledAspectRatio = styled(AspectRatio)(backgroundStyles);

const imageStyles = css`
  label: carousel__image;
  img {
    object-fit: cover;
  }
`;
const StyledImage = styled(Image)(imageStyles);

const SlideImage = ({ src, alt, aspectRatio, ...props }) => (
  <StyledAspectRatio aspectRatio={aspectRatio}>
    <StyledImage src={src} alt={alt} {...props} />
  </StyledAspectRatio>
);

SlideImage.propTypes = {
  /**
   * Specifies the source URL of an image.
   */
  src: PropTypes.string.isRequired,
  /**
   * Provides alternative information if a user cannot view the image,
   * e.g. because of slow connection, an error in the src attribute, or if the
   * user uses a screen reader.
   */
  alt: PropTypes.string.isRequired,
  /**
   * Image aspect ratio.
   */
  aspectRatio: PropTypes.number,
};

SlideImage.defaultProps = {
  aspectRatio: ASPECT_RATIO,
};

export default SlideImage;
