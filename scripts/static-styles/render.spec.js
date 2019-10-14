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

import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { theme as themes } from '../../src';
import render from './render';

describe('Render', () => {
  const { circuit } = themes;

  const styles = ({ theme }) => css`
    color: ${theme.colors.red};
  `;

  const name = 'component';
  const Component = styled('div')(styles);

  it('should render the component', () => {
    const insert = jest.fn();
    const insertFactory = jest.fn(() => insert);
    const renderFn = render(circuit, insertFactory);
    const actual = renderFn(Component, name);
    expect(actual).toContain('div');
  });

  it('should render the component with props', () => {
    const props = { children: 'Foo' };
    const insert = jest.fn();
    const insertFactory = jest.fn(() => insert);
    const renderFn = render(circuit, insertFactory);
    const actual = renderFn(Component, props, name);
    expect(actual).toContain('Foo');
  });

  it('should insert the styles', () => {
    const insert = jest.fn();
    const insertFactory = jest.fn(() => insert);
    const renderFn = render(circuit, insertFactory);

    renderFn(Component, name);

    expect(insert).toHaveBeenCalled();
    expect(insert).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        styles: expect.any(String)
      }),
      expect.any(Object),
      expect.any(Boolean)
    );
  });
});
