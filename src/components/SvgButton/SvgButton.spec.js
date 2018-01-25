import React from 'react';

import { SvgButton } from '.';

describe('SvgButton', () => {
  it('should render with the default styles', () => {
    const actual = create(
      <SvgButton>
        <div>SVG here</div>
      </SvgButton>
    );
    expect(actual).toMatchSnapshot();
  });
});
