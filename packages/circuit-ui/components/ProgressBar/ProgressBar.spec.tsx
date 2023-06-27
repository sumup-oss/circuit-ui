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

import { render, axe, screen } from '../../util/test-utils.js';

import { ProgressBar } from './ProgressBar.js';

describe('ProgressBar', () => {
  describe('step-based', () => {
    const baseProps = {
      label: 'A progress bar',
      max: 1,
      value: 0.5,
    };

    it('should have relevant aria attributes', () => {
      render(<ProgressBar {...baseProps} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '0.5');
      expect(progressbar).toHaveAttribute('aria-valuemin', '0');
      expect(progressbar).toHaveAttribute('aria-valuemax', '1');
    });

    it('should have no accessibility violations', async () => {
      const { container } = render(<ProgressBar {...baseProps} />);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });

  describe('time-based', () => {
    const baseProps = {
      label: 'A progress bar',
    };

    it('should have no irrelevant aria attributes', () => {
      render(<ProgressBar {...baseProps} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).not.toHaveAttribute('aria-valuenow');
      expect(progressbar).not.toHaveAttribute('aria-valuemin');
      expect(progressbar).not.toHaveAttribute('aria-valuemax');
    });

    it('should have a data attribute when looped', () => {
      render(<ProgressBar {...baseProps} loop />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('data-loop');
    });

    it('should have no accessibility violations', async () => {
      const { container } = render(<ProgressBar {...baseProps} />);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
