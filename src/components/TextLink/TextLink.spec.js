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

  it('should have kilo link styles', () => {
    const actual = create(<TextLink size={TextLink.KILO}>TextLink</TextLink>);
    expect(actual).toMatchSnapshot();
  });

  it('should have mega link styles', () => {
    const actual = create(<TextLink size={TextLink.MEGA}>TextLink</TextLink>);
    expect(actual).toMatchSnapshot();
  });

  it('should have giga link styles', () => {
    const actual = create(<TextLink size={TextLink.GIGA}>TextLink</TextLink>);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines when used as anchor', async () => {
    const wrapper = renderToHtml(<TextLink href="">Link</TextLink>);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });

  it('should meet accessibility guidelines when used as button', async () => {
    const wrapper = renderToHtml(<TextLink onClick={() => {}}>Link</TextLink>);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
