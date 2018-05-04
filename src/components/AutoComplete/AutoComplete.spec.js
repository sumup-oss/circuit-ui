import React from 'react';

import AutoComplete from '.';
// import Label from '../Label';

describe('AutoComplete', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<AutoComplete handleChange={() => {}} items={[]} />);
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
        <AutoComplete id="inp" handleChange={() => {}} items={[]} />
      </Label>
    );

    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
  */
});
