/**
 * Copyright 2020, SumUp Ltd.
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

import { ValidationHint, ValidationHintProps } from './ValidationHint';

describe('ValidationHint', () => {
  function renderValidationHint<T>(
    renderFn: RenderFn<T>,
    props: ValidationHintProps = {},
  ) {
    return renderFn(
      <ValidationHint validationHint="This field is required" {...props} />,
    );
  }

  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = renderValidationHint(create);
      expect(actual).toMatchSnapshot();
    });

    it('should render with invalid styles', () => {
      const actual = renderValidationHint(create, { invalid: true });
      expect(actual).toMatchSnapshot();
    });

    it('should render with warning styles', () => {
      const actual = renderValidationHint(create, { hasWarning: true });
      expect(actual).toMatchSnapshot();
    });

    it('should render with valid styles', () => {
      const actual = renderValidationHint(create, { showValid: true });
      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderValidationHint(renderToHtml);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
