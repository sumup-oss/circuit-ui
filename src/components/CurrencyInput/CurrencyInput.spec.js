import React from 'react';

import CurrencyInput from '.';
import Label from '../Label';

describe('CurrencyInput', () => {
  /**
   * Style tests.
   */

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <Label htmlFor="id">
        Label
        <CurrencyInput id="id" locale="de-DE" currency="EUR" />
      </Label>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
