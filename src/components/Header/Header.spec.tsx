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

import {
  create,
  render,
  RenderFn,
  renderToHtml,
  axe,
} from '../../util/test-utils';

import { Header, HeaderProps } from './Header';

describe('Header', () => {
  const baseProps = {
    'title': 'Title',
    'mobileOnly': false,
    'data-testid': 'child',
    'children': 'Text',
  };

  function renderHeader<T>(renderFn: RenderFn<T>, props: HeaderProps) {
    return renderFn(<Header {...props} />);
  }

  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = renderHeader(create, baseProps);
      expect(actual).toMatchSnapshot();
    });

    it('should render and match snapshot for mobileOnly styles', () => {
      const mobileProps = { ...baseProps, mobileOnly: true };
      const actual = renderHeader(create, mobileProps);
      expect(actual).toMatchSnapshot();
    });

    it('should render children', () => {
      const { getByTestId } = renderHeader(render, baseProps);
      const childEl = getByTestId('child');
      expect(childEl).not.toBeNull();
      expect(childEl).toHaveTextContent('Text');
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Header {...baseProps} />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
