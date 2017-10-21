import React from 'react';
import renderer from 'react-test-renderer';
import Headline from '.';

describe('Headline', () => {
  it('should render the type as the tag name by default', () => {
    const type = 'h1';
    const actual = renderer.create(<Headline type={type}>Hello</Headline>);
    expect(actual).toMatchSnapshot();
  });
  it('should use a paragraph tag if `displayOnly` property is provided', () => {
    const type = 'h1';
    const actual = renderer.create(
      <Headline type={type} displayOnly={true}>
        Hello
      </Headline>
    );
    expect(actual).toMatchSnapshot();
  });
});
