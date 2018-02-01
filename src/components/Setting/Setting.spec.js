import React from 'react';

import Setting from '.';

describe('Setting', () => {
  it('should have the correct default styles', () => {
    const actual = create(<Setting />);
    expect(actual).toMatchSnapshot();
  });

  it('should have no bottom margin when "withMargin" is falsy', () => {
    const actual = create(<Setting withMargin={false} />);
    expect(actual).toMatchSnapshot(actual);
  });
});
