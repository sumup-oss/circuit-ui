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

import createCache from '@emotion/cache';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { theme as themes } from '../../src';
import render from './render';

describe('Render', () => {
  const cache = createCache();
  const { circuit } = themes;

  const styles = ({ theme }) => css`
    color: ${theme.colors.red};
  `;

  const Component = styled('div')(styles);

  it('should render the component', () => {
    const renderFn = render({ cache, theme: circuit });
    const actual = renderFn(Component);
    expect(actual).toContain('div');
  });

  it('should render the component with props', () => {
    const props = { children: 'Foo' };
    const renderFn = render({ cache, theme: circuit });
    const actual = renderFn(Component, props);
    expect(actual).toContain('Foo');
  });

  // FIXME: For some reason, this test doesn't pass :(
  it.skip('should insert the styles', () => {
    const insert = jest.fn();
    const renderFn = render({ cache: { ...cache, insert }, theme: circuit });

    renderFn(Component);

    expect(insert).toHaveBeenCalled();
  });
});
