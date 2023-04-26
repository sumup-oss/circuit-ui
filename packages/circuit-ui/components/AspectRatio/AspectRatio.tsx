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

import { Children, forwardRef, cloneElement, ReactElement } from 'react';
import { ClassNames, css, ClassNamesContent } from '@emotion/react';

import styled from '../../styles/styled.js';

export interface AspectRatioProps {
  children?: ReactElement;
  aspectRatio?: number;
}

const wrapperStyles = ({ aspectRatio }: { aspectRatio: number }) => css`
  display: block;
  position: relative;
  overflow: hidden;
  height: 0;
  width: 100%;
  padding-top: ${Math.round((1 / aspectRatio) * 100)}%;
`;

const Wrapper = styled('div')(wrapperStyles);

const childStyles = (context: ClassNamesContent) => context.css`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: ${context.theme.zIndex.absolute};
`;

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ aspectRatio, children, ...props }, ref) => {
    if (!children) {
      return null;
    }

    const child = Children.only(children);

    if (!aspectRatio) {
      return (
        <div ref={ref} {...props}>
          {child}
        </div>
      );
    }

    return (
      <Wrapper ref={ref} aspectRatio={aspectRatio} {...props}>
        <ClassNames>
          {(context) =>
            cloneElement(child, { className: childStyles(context) })
          }
        </ClassNames>
      </Wrapper>
    );
  },
);

AspectRatio.displayName = 'AspectRatio';
