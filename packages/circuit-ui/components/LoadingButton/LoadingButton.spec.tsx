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

import { create, renderToHtml, axe, RenderFn } from '../../util/test-utils';

import { LoadingButton, LoadingButtonProps } from './LoadingButton';

describe('LoadingButton', () => {
  function renderLoadingButton<T>(
    renderFn: RenderFn<T>,
    props: LoadingButtonProps,
  ) {
    return renderFn(<LoadingButton {...props} />);
  }

  const baseProps = {
    children: 'Things take time',
    loadingLabel: 'Loading',
  };

  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = renderLoadingButton(create, baseProps);
      expect(actual).toMatchSnapshot();
    });

    it('should render with loading styles', () => {
      const actual = renderLoadingButton(create, {
        ...baseProps,
        isLoading: true,
      });
      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderLoadingButton(renderToHtml, baseProps);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
