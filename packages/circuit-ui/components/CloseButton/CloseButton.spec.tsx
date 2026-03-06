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

import { describe, expect, it } from 'vitest';
import { createRef } from 'react';

import { axe, render, screen } from '../../util/test-utils.js';

import { CloseButton } from './CloseButton.js';

describe('CloseButton', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    render(<CloseButton className={className}>Close</CloseButton>);
    const button = screen.getByRole('button', { name: 'Close' });
    expect(button?.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLHRElement>();
    render(<CloseButton ref={ref}>Close</CloseButton>);
    const button = screen.getByRole('button', { name: 'Close' });
    expect(ref.current).toBe(button);
  });

  it('should render with default translated label', () => {
    render(<CloseButton locale="fr-FR" />);
    expect(screen.getByText('Fermer')).toBeVisible();
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<CloseButton>Close</CloseButton>);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
