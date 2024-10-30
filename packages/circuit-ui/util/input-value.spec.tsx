/**
 * Copyright 2024, SumUp Ltd.
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

import type { InputHTMLAttributes } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { render, screen } from './test-utils.js';
import { changeInputValue } from './input-value.js';

describe('input-value', () => {
  describe('changeInputValue', () => {
    function Component(props: InputHTMLAttributes<HTMLInputElement> = {}) {
      return <input type="text" {...props} />;
    }

    it('should set the input value', () => {
      render(<Component />);

      const value = 'foo';
      const input: HTMLInputElement = screen.getByRole('textbox');

      changeInputValue(input, value);

      expect(input).toHaveValue(value);
    });

    it('should dispatch a change event', () => {
      const onChange = vi.fn();

      render(<Component onChange={onChange} />);

      const value = 'foo';
      const input: HTMLInputElement = screen.getByRole('textbox');

      changeInputValue(input, value);

      expect(onChange).toHaveBeenCalledOnce();
    });
  });
});
