import React from 'react';
import renderer from 'react-test-renderer';
import Paragraph from '.';

describe('Paragraph', () => {
  it('should render a paragraph', () => {
    const actual = renderer.create(<Paragraph>Hello</Paragraph>);
    expect(actual).toMatchSnapshot();
  });
});
