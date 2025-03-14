/**
 * Copyright 2025, SumUp Ltd.
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

import { render, screen } from '../../../../util/test-utils.js';

import { TableCell } from './TableCell.js';

describe('TableCell', () => {
  const cellLabel = 'Cell label';
  const cellValue = 'Cell value';
  const cellDescription = 'Cell description';

  it('should render as row header', () => {
    render(
      <TableCell
        isHeader
        value={cellValue}
        label={cellLabel}
        description={cellDescription}
      />,
    );
    expect(screen.getByRole('rowheader')).toBeInTheDocument();
    expect(screen.getByText(cellDescription)).toBeInTheDocument();
  });
  it('should render as row cell', () => {
    render(<TableCell value={cellValue} label={cellLabel} />);
    expect(screen.getByRole('cell')).toBeInTheDocument();
  });
  it('should render content as paragraph when value is a string', () => {
    render(<TableCell value={cellValue} label="label" />);
    expect(screen.getByRole('paragraph')).toBeVisible();
    expect(screen.getByRole('paragraph').textContent).toBe(cellValue);
  });
  it('should render checked icon when value is true', () => {
    render(<TableCell value={true} label={cellLabel} />);
    expect(screen.getByTestId('boolean-value-true')).toBeVisible();
    expect(screen.getByText(cellLabel)).toBeInTheDocument();
  });
  it('should render unchecked icon when value is false', () => {
    render(<TableCell value={false} label={cellLabel} />);
    expect(screen.getByTestId('boolean-value-false')).toBeVisible();
    expect(screen.getByText(cellLabel)).toBeInTheDocument();
  });
  it('should render unchecked icon when value is undefined', () => {
    render(<TableCell value={undefined} label={cellLabel} />);
    expect(screen.getByTestId('boolean-value-false')).toBeVisible();
    expect(screen.getByText(cellLabel)).toBeInTheDocument();
  });
});
