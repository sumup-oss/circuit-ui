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

import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';

import { render, screen } from '../../../../util/test-utils.js';
import { useMedia } from '../../../../hooks/useMedia/index.js';
import { posPlusPlan } from '../../fixtures.js';

import { TableHeader, type TableHeaderProps } from './TableHeader.js';

vi.mock('../../../../hooks/useMedia/index.js');

describe('TableHeader', () => {
  beforeEach(() => {
    (useMedia as Mock).mockReturnValue(false);
  });

  const baseProps: TableHeaderProps = posPlusPlan;

  it('should render all plan information', () => {
    render(<TableHeader {...baseProps} tier={{ variant: 'plus' }} />);
    expect(screen.getByText(baseProps.title)).toBeVisible();
    expect(screen.getByText(baseProps.description)).toBeVisible();
    expect(
      screen.getByText(baseProps.callToAction.children as string),
    ).toBeVisible();
    expect(screen.getByText('plus')).toBeVisible();
  });

  it('should hide call to action button on mobile', () => {
    (useMedia as Mock).mockReturnValue(true);
    render(<TableHeader {...baseProps} />);
    expect(screen.queryByText('call to action')).not.toBeInTheDocument();
  });
});
