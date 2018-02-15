import React from 'react';

import Text from '.';

describe('Text', () => {
  /**
   * Style tests.
   */
  const elements = ['p', 'article', 'div'];
  elements.forEach(el => {
    it(`should render as ${el} element, when passed "${el}" for the element prop`, () => {
      const heading = create(
        <Text element={el}>{`${el.toUpperCase()} heading`}</Text>
      ).toJSON();
      expect(heading).toMatchSnapshot();
    });
  });

  const sizes = ['kilo', 'mega', 'giga'];
  sizes.forEach(size => {
    it(`should render with size ${size}, when passed "${size}" for the size prop`, () => {
      const heading = create(
        <Text {...{ size }}>{`${size} heading`}</Text>
      ).toJSON();
      expect(heading).toMatchSnapshot();
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Text>Text</Text>);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
