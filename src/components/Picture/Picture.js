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
import { map } from 'lodash/fp';

/**
 * A custom picture component.
 */
const Picture = ({ sources, fallback, alt, ...rest }) => (
  <picture {...rest}>
    {map(
      s => (
        <source key={s.srcSet} {...s} />
      ),
      sources
    )}
    <img src={fallback} alt={alt} />
  </picture>
);

Picture.propTypes = {
  /**
   * An array of sources to be included in the
   * picture. `media` and `srcSet` properties
   * of each source match the respecitve HTML
   * attributes.
   */
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      media: PropTypes.string,
      srcSet: PropTypes.string.isRequired
    })
  ),
  /**
   * Alt text for the image.
   */
  alt: PropTypes.string.isRequired,
  /**
   * Fallback image URL.
   */
  fallback: PropTypes.string.isRequired
};

Picture.defaultProps = {
  sources: []
};

/**
 * @component
 */
export default Picture;
