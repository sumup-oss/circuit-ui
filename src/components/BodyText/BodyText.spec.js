import React from 'react';
import renderer from 'react-test-renderer';

import BodyText from './BodyText';

describe('BodyText', () => {
  const elements = ['p', 'article', 'div'];
  elements.forEach(el => {
    it(`should render as ${el} element, when passed "${el}" for the element prop`, () => {
      const heading = renderer
        .create(
          <BodyText element={el}>{`${el.toUpperCase()} heading`}</BodyText>
        )
        .toJSON();
      expect(heading).toMatchSnapshot();
    });
  });
  const sizes = ['kilo', 'mega', 'giga'];
  sizes.forEach(size => {
    it(`should render with size ${size}, when passed "${size}" for the size prop`, () => {
      const heading = renderer
        .create(<BodyText {...{ size }}>{`${size} heading`}</BodyText>)
        .toJSON();
      expect(heading).toMatchSnapshot();
    });
  });
});
