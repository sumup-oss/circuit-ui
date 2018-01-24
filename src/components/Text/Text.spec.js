import React from 'react';
import renderer from 'react-test-renderer';

import Text from './Text';

describe('Text', () => {
  const elements = ['p', 'article', 'div'];
  elements.forEach(el => {
    it(`should render as ${el} element, when passed "${el}" for the element prop`, () => {
      const heading = renderer
        .create(
          <Text element={el}>{`${el.toUpperCase()} heading`}</Text>
        )
        .toJSON();
      expect(heading).toMatchSnapshot();
    });
  });
  const sizes = ['kilo', 'mega', 'giga'];
  sizes.forEach(size => {
    it(`should render with size ${size}, when passed "${size}" for the size prop`, () => {
      const heading = renderer
        .create(<Text {...{ size }}>{`${size} heading`}</Text>)
        .toJSON();
      expect(heading).toMatchSnapshot();
    });
  });
});
