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
import { Close } from '@sumup-oss/icons';

import { render, screen } from '../../util/test-utils.js';

import { IconButton } from './IconButton.js';

describe('IconButton', () => {
  it('should render an icon passed a prop', () => {
    render(
      <IconButton icon={(props) => <svg {...props} data-testid="icon" />}>
        Close
      </IconButton>,
    );
    const icon = screen.getByTestId('icon');
    expect(icon).toBeVisible();
  });

  /**
   * @deprecated
   */
  it('should render an icon passed as children', () => {
    render(
      // eslint-disable-next-line @sumup-oss/circuit-ui/no-renamed-props
      <IconButton label="Close">
        <svg data-testid="icon" />
      </IconButton>,
    );
    const icon = screen.getByTestId('icon');
    expect(icon).toBeVisible();
  });

  it('should render a visually hidden label', () => {
    render(<IconButton icon={Close}>Close</IconButton>);
    const label = screen.getByText('Close');
    expect(label).toBeInTheDocument();
  });

  it('should render with an accessible name', () => {
    render(<IconButton icon={Close}>Close</IconButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveAccessibleName('Close');
  });
});
