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

import React from 'react';
import PaymentMethodIcon from './PaymentMethodIcon';

describe('PaymentMethodIcon', () => {
  const iconId = 'visa';
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(
      <PaymentMethodIcon size={PaymentMethodIcon.KILO} iconId={iconId} />
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests
   */
  it('should render the specified icon', () => {
    const { getByTestId } = render(
      <PaymentMethodIcon
        size={PaymentMethodIcon.BYTE}
        iconId={iconId}
        data-testid="payment-method-icon"
      />
    );

    const iconEl = getByTestId('payment-method-icon');
    expect(iconEl).toBeVisible();
    expect(iconEl.firstChild).toHaveTextContent(`${iconId}.svg`);
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <PaymentMethodIcon size={PaymentMethodIcon.GIGA} iconId={iconId} />
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
