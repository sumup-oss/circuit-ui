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

import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ClassNames, css } from '@emotion/core';

import { childrenPropType } from '../../util/shared-prop-types';

const wrapperBaseStyles = () => css`
  display: block;
  position: relative;
  overflow: hidden;
  height: auto;
  width: 100%;
`;

const wrapperAspectRatioStyles = ({ aspectRatio }) =>
  aspectRatio &&
  css`
    height: 0;
    width: 100%;
    padding-top: ${Math.round((1 / aspectRatio) * 100)}%;
  `;

const Wrapper = styled('div')(wrapperBaseStyles, wrapperAspectRatioStyles);

const childBaseStyles = (cssClassName) => cssClassName`
  display: block;
  height: auto;
  max-height: 100%;
  width: 100%;
`;

const childAspectRatioStyles = (cssClassName, { aspectRatio }) =>
  aspectRatio &&
  cssClassName`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-height: none;
    object-fit: cover;
    z-index: 2;
  `;

const AspectRatio = React.forwardRef(
  ({ aspectRatio, children, ...props }, ref) => {
    if (!children) {
      return null;
    }

    const [child, ...restChildren] = Children.toArray(children);

    return (
      <Wrapper ref={ref} aspectRatio={aspectRatio} {...props}>
        <ClassNames>
          {({ css: cssClassName, cx }) =>
            React.cloneElement(child, {
              className: cx(
                childBaseStyles(cssClassName),
                childAspectRatioStyles(cssClassName, { aspectRatio }),
              ),
            })
          }
        </ClassNames>
        {restChildren}
      </Wrapper>
    );
  },
);

AspectRatio.displayName = 'AspectRatio';

AspectRatio.propTypes = {
  children: childrenPropType,
  aspectRatio: PropTypes.number,
};

export default AspectRatio;
