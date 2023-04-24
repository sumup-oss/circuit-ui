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

import { describe, expect, it } from 'vitest';
import { createRef } from 'react';

import { create, render, axe, RenderFn } from '../../util/test-utils.jsx';

import {
  Skeleton,
  SkeletonProps,
  SkeletonContainer,
  SkeletonContainerProps,
} from './Skeleton.jsx';

describe('Skeleton', () => {
  function renderSkeleton<T>(
    renderFn: RenderFn<T>,
    { isLoading, children, ...props }: SkeletonProps & SkeletonContainerProps,
  ) {
    return renderFn(
      <SkeletonContainer isLoading={isLoading}>
        <Skeleton {...props}>
          <p>{children}</p>
        </Skeleton>
      </SkeletonContainer>,
    );
  }

  const baseProps = { isLoading: true, children: 'content' };

  describe('styles', () => {
    it('should render with loading styles', () => {
      const wrapper = renderSkeleton(create, baseProps);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render with circular styles', () => {
      const wrapper = renderSkeleton(create, { ...baseProps, circle: true });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it('should hide the content while loading', () => {
      const { getByText } = renderSkeleton(render, baseProps);
      expect(getByText('content')).not.toBeVisible();
    });

    it('should show the content when loaded', () => {
      const { getByText } = renderSkeleton(render, {
        ...baseProps,
        isLoading: false,
      });
      expect(getByText('content')).toBeVisible();
    });

    it('should accept a working ref for the SkeletonContainer', () => {
      const ref = createRef<HTMLDivElement>();
      const { container } = render(
        <SkeletonContainer ref={ref} {...baseProps} />,
      );
      const element = container.querySelector('div');
      expect(ref.current).toBe(element);
    });

    it('should accept a working ref for the Skeleton', () => {
      const ref = createRef<HTMLSpanElement>();
      const { container } = render(<Skeleton ref={ref} {...baseProps} />);
      const element = container.querySelector('span');
      expect(ref.current).toBe(element);
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = renderSkeleton(render, baseProps);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
