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

import React from 'react';

import { render, axe } from '../../util/test-utils';

import { ImageInput, ImageInputProps } from './ImageInput';

describe('ImageInput', () => {
  function renderImageInput(props: ImageInputProps = {}, options = {}) {
    return render(<ImageInput {...props} />, options);
  }

  describe('styles', () => {
    it('should render with default styles', () => {
      const { container } = renderImageInput();
      expect(container).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it.todo('should have tests');
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = renderImageInput();
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
