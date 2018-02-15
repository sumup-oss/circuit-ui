import React from 'react';

import Heading from '.';

describe('Heading', () => {
  /**
   * Style tests.
   */
  const elements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  elements.forEach(el => {
    it(`should render as ${el} element, when passed "${el}" for the element prop`, () => {
      const heading = create(
        <Heading element={el}>{`${el.toUpperCase()} heading`}</Heading>
      ).toJSON();
      expect(heading).toMatchSnapshot();
    });
  });
  const sizes = ['kilo', 'mega', 'giga', 'tera', 'peta', 'exa', 'zetta'];
  sizes.forEach(size => {
    it(`should render with size ${size}, when passed "${size}" for the size prop`, () => {
      const heading = create(
        <Heading {...{ size }}>{`${size} heading`}</Heading>
      ).toJSON();
      expect(heading).toMatchSnapshot();
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Heading>Heading</Heading>);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
