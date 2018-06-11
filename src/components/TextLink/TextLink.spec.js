import React from 'react';

import TextLink from '.';

describe('TextLink', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<TextLink>Link</TextLink>);
    expect(actual).toMatchSnapshot();
  });

  it('should render with href', () => {
    const actual = create(<TextLink href="example">TextLink</TextLink>);
    expect(actual).toMatchSnapshot();
  });

  it('should have primary styles', () => {
    const actual = create(<TextLink primary>TextLink</TextLink>);
    expect(actual).toMatchSnapshot();
  });

  it('should have kilo button styles', () => {
    const actual = create(<TextLink size={TextLink.KILO}>TextLink</TextLink>);
    expect(actual).toMatchSnapshot();
  });

  it('should have mega button styles', () => {
    const actual = create(<TextLink size={TextLink.MEGA}>TextLink</TextLink>);
    expect(actual).toMatchSnapshot();
  });

  it('should have giga button styles', () => {
    const actual = create(<TextLink size={TextLink.GIGA}>TextLink</TextLink>);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<TextLink>Link</TextLink>);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
