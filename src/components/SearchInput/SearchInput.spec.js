import React from 'react';

import SearchInput from '.';
import Label from '../Label';

describe('SearchInput', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<SearchInput />);
    expect(actual).toMatchSnapshot();
  });

  it('should grey out icon when disabled', () => {
    const actual = create(<SearchInput disabled />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <Label htmlFor="search">
        <SearchInput id="search" />
        Search
      </Label>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
