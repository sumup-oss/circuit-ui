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

import { render, axe, RenderFn } from '../../util/test-utils.js';

import {
  Skeleton,
  SkeletonProps,
  SkeletonContainer,
  SkeletonContainerProps,
} from './Skeleton.js';

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

  it('should hide the content while loading', () => {
    const { container } = renderSkeleton(render, baseProps);
    const element = container.querySelector('div');
    expect(element).toHaveAttribute('aria-busy', 'true');
    expect(element).toHaveAttribute('inert');
  });

  it('should show the content when loaded', () => {
    const { container } = renderSkeleton(render, {
      ...baseProps,
      isLoading: false,
    });
    const element = container.querySelector('div');
    expect(element).toHaveAttribute('aria-busy', 'false');
    expect(element).not.toHaveAttribute('inert');
  });

  it('should forward a ref to the SkeletonContainer', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <SkeletonContainer ref={ref} {...baseProps} />,
    );
    const element = container.querySelector('div');
    expect(ref.current).toBe(element);
  });

  it('should forward a ref to the Skeleton', () => {
    const ref = createRef<HTMLSpanElement>();
    const { container } = render(<Skeleton ref={ref} {...baseProps} />);
    const element = container.querySelector('span');
    expect(ref.current).toBe(element);
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderSkeleton(render, baseProps);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
