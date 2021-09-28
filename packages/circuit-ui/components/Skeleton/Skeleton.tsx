/**
 * Copyright 2021, SumUp Ltd.
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

import { createContext, useContext, ReactNode, forwardRef, Ref } from 'react';
import { css, keyframes } from '@emotion/react';
import isPropValid from '@emotion/is-prop-valid';

import styled, { StyleProps } from '../../styles/styled';

const SkeletonContext = createContext(false);

export interface SkeletonContainerProps {
  /**
   * The SkeletonContainer should wrap the entire section that's loading.
   */
  children: ReactNode;
  /**
   * Whether the section content is loading.
   */
  isLoading: boolean;
  /**
   * A reference to the HTML DOM element.
   */
  ref?: Ref<HTMLDivElement>;
}

const containerStyles = css`
  &[aria-busy='true'] {
    pointer-events: none;
    user-select: none;
  }
`;

const Container = styled('div', {
  // `inert` is a new HTML attribute to prevent user input events in an area.
  // This is a progressive enhancement since few browsers support it yet.
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert
  shouldForwardProp: (prop) => isPropValid(prop) || prop === 'inert',
})<{ inert: boolean }>(containerStyles);

/**
 * The SkeletonContainer wraps a section that's loading. It disables user
 * interactions and signals to screen readers that content is being loaded.
 */
export const SkeletonContainer = forwardRef(
  (
    { children, isLoading, ...props }: SkeletonContainerProps,
    ref: SkeletonContainerProps['ref'],
  ) => (
    <SkeletonContext.Provider value={isLoading}>
      <Container {...props} ref={ref} aria-busy={isLoading} inert={isLoading}>
        {children}
      </Container>
    </SkeletonContext.Provider>
  ),
);

SkeletonContainer.displayName = 'SkeletonContainer';

export interface SkeletonProps {
  /**
   * The content that should be replaced by a skeleton element when it being
   * loaded.
   */
  children: ReactNode;
  /**
   * Whether the skeleton should be circular instead of rectangular.
   * Default: `false`.
   */
  circle?: boolean;
  /**
   * A reference to the HTML DOM element.
   */
  ref?: Ref<HTMLSpanElement>;
}

const PULSE_WIDTH = '8rem';

const pulse = keyframes`
  0% {
    background-position: -${PULSE_WIDTH} 0;
  }
  50% {
    background-position: calc(${PULSE_WIDTH} + 100%) 0;
  }
  100% {
    background-position: calc(${PULSE_WIDTH} + 100%) 0;
  }
`;

const baseStyles = css`
  display: inline-block;
  line-height: 0;
`;

const placeholderStyles = ({
  theme,
  circle,
}: StyleProps & SkeletonProps) => css`
  border-radius: ${circle
    ? theme.borderRadius.circle
    : theme.borderRadius.byte};
  background-color: ${theme.colors.n200};
  background-image: linear-gradient(
    90deg,
    ${theme.colors.n200},
    ${theme.colors.n100},
    ${theme.colors.n200}
  );
  background-size: ${PULSE_WIDTH} 100%;
  background-repeat: no-repeat;
  animation: ${pulse} 3s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  > * {
    visibility: hidden !important;
  }
`;

const Placeholder = styled.span(baseStyles, placeholderStyles);
const Content = styled.span(baseStyles);

/**
 * A placeholder for asynchronously loaded content with a subtle loading
 * animation. Only works when wrapped in a SkeletonContainer.
 */
export const Skeleton = forwardRef(
  ({ children, ...props }: SkeletonProps, ref: SkeletonProps['ref']) => {
    const isLoading = useContext(SkeletonContext);

    if (isLoading) {
      return (
        <Placeholder {...props} ref={ref}>
          {children}
        </Placeholder>
      );
    }

    return (
      <Content {...props} ref={ref}>
        {children}
      </Content>
    );
  },
);

Skeleton.displayName = 'Skeleton';
