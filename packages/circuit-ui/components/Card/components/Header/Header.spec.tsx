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

import {
  create,
  render,
  renderToHtml,
  axe,
  userEvent,
} from '../../../../util/test-utils.jsx';

import { CardHeader } from './Header.jsx';

describe('CardHeader', () => {
  const children = <p>This is a content.</p>;

  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<CardHeader>{children}</CardHeader>);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */
  it('should render a close button when an onClose prop is passed', () => {
    const closeButtonLabel = 'Close';

    const { getByRole } = render(
      <CardHeader closeButtonLabel="Close" onClose={vi.fn()}>
        {children}
      </CardHeader>,
    );
    const closeButton = getByRole('button');

    expect(closeButton).toBeVisible();
    expect(closeButton).toHaveTextContent(closeButtonLabel);
  });

  it('should call the onClose prop when the close button is clicked', async () => {
    const onClose = vi.fn();

    const { getByRole } = render(
      <CardHeader closeButtonLabel="Close" onClose={onClose}>
        {children}
      </CardHeader>,
    );
    const closeButton = getByRole('button');

    await userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <CardHeader closeButtonLabel="Close">{children}</CardHeader>,
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
