import React from 'react';
import renderer from 'react-test-renderer';
import { sizesToConfig } from './service';
import Text from '.';

describe('Text', () => {
  it('should convert a size list to className list', () => {
    const sizes = ['s', 'm'];
    const size = 's';
    const expected = { 'type-s': true, 'type-m': false };
    const actual = sizesToConfig(sizes, size);
    expect(actual).toEqual(expected);
  });
  it('should respect the size property', () => {
    const size = 's';
    const actual = renderer.create(<Text size={size}>Hello</Text>);
    expect(actual).toMatchSnapshot();
  });
  it('should be possible to render text inline', () => {
    const size = 's';
    const actual = renderer.create(
      <Text size={size} inline={true}>
        Hi
      </Text>
    );
    expect(actual).toMatchSnapshot();
  });
});
