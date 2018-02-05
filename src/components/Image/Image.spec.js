import React from 'react';

import Image from '.';

describe('Image', () => {
  it('should have responsive styles', () => {
    const actual = create(
      <Image
        src="http://www.placepuppy.net/1p/800/500"
        alt="A random cute puppy"
      />
    );
    expect(actual).toMatchSnapshot();
  });
});
