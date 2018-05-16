import React from 'react';

import TableCell from '.';

const children = 'Foo';

describe('TableCell', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<TableCell>{children}</TableCell>);
    expect(actual).toMatchSnapshot();
  });

  it('should render with isHovered styles', () => {
    const actual = create(<TableCell isHovered>{children}</TableCell>);
    expect(actual).toMatchSnapshot();
  });

  it('should render with header styles', () => {
    const actual = create(<TableCell header>{children}</TableCell>);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<TableCell sortable>{children}</TableCell>);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
