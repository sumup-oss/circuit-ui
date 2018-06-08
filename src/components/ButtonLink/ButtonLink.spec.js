import React from 'react';

import ButtonLink from '.';

describe('ButtonLink', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<ButtonLink>Link</ButtonLink>);
    expect(actual).toMatchSnapshot();
  });

  it('should render with href', () => {
    const actual = create(<ButtonLink href="example">ButtonLink</ButtonLink>);
    expect(actual).toMatchSnapshot();
  });

  it('should have primary styles', () => {
    const actual = create(<ButtonLink primary>ButtonLink</ButtonLink>);
    expect(actual).toMatchSnapshot();
  });

  it('should have kilo button styles', () => {
    const actual = create(
      <ButtonLink size={ButtonLink.KILO}>ButtonLink</ButtonLink>
    );
    expect(actual).toMatchSnapshot();
  });

  it('should have mega button styles', () => {
    const actual = create(
      <ButtonLink size={ButtonLink.MEGA}>ButtonLink</ButtonLink>
    );
    expect(actual).toMatchSnapshot();
  });

  it('should have giga button styles', () => {
    const actual = create(
      <ButtonLink size={ButtonLink.GIGA}>ButtonLink</ButtonLink>
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<ButtonLink>Link</ButtonLink>);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
