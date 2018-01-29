import React from 'react';

import SubHeading from '.';

describe('SubHeading', () => {
  const elements = ['h2', 'h3', 'h4', 'h5', 'h6'];
  elements.forEach(el => {
    it(`should render as ${el.toUpperCase()} element, when passed "${el}" for the element prop`, () => {
      const heading = create(
        <SubHeading element={el}>{`${el.toUpperCase()} heading`}</SubHeading>
      ).toJSON();
      expect(heading).toMatchSnapshot();
    });
  });
  const sizes = ['kilo', 'mega'];
  sizes.forEach(size => {
    it(`should render with size ${size}, when passed "${size}" for the size prop`, () => {
      const heading = create(
        <SubHeading {...{ size }}>{`${size} heading`}</SubHeading>
      ).toJSON();
      expect(heading).toMatchSnapshot();
    });
  });
});
