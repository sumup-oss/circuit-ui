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

import { describe, expect, it, vi } from 'vitest';

import { render } from '../../util/test-utils.js';

import { BaseStyles } from './BaseStyles.js';
import {
  createBaseStyles,
  createInternalRootVariables,
} from './BaseStylesService.js';

vi.mock('./BaseStylesService', () => ({
  createBaseStyles: vi.fn(),
  createInternalRootVariables: vi.fn(),
}));

describe('BaseStyles', () => {
  it('should create the global base stylesheet', () => {
    render(<BaseStyles />);
    expect(createBaseStyles).toHaveBeenCalled();
    expect(createInternalRootVariables).toHaveBeenCalled();
  });
});
