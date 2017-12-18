import React from 'react';
import renderer from 'react-test-renderer';
import Card from '.';

describe('Card', () => {
  it('should respect the variant flag', () => {
    const variants = ['standard', 'inlay', 'overlay'];
    const actuals = variants.map(v =>
      renderer.create(<Card variant={v}>Hi</Card>)
    );
    expect(actuals).toMatchSnapshot();
  });
});
