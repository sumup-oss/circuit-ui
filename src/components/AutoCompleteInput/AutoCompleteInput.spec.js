import React from 'react';

import AutoCompleteInput from '.';
// import Label from '../Label';

describe('AutoCompleteInput', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(
      <AutoCompleteInput handleChange={() => {}} items={[]} />
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */

  /*
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <Label htmlFor="inp">
        Label
        <AutoCompleteInput id="inp" handleChange={() => {}} items={[]} />
      </Label>
    );

    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
  */
});
