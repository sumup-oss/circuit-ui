import React from 'react';

import Image from '.';

describe('Image', () => {
  /**
   * Style tests.
   */
  it('should have responsive styles', () => {
    const actual = create(
      <Image
        src="http://www.placepuppy.net/1p/800/500"
        alt="A random cute puppy"
      />
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <Image
        src="http://www.placepuppy.net/1p/800/500"
        alt="A random cute puppy"
      />
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
