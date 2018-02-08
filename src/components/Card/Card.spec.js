import React from 'react';

import Card from '.';

describe('Card', () => {
  it('should render with the correct styles', () => {
    const actual = create(<Card />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with shadow styles', () => {
    const actualSingle = create(<Card shadow={Card.SINGLE} />);
    expect(actualSingle).toMatchSnapshot();
    const actualDouble = create(<Card shadow={Card.DOUBLE} />);
    expect(actualDouble).toMatchSnapshot();
    const actualTriple = create(<Card shadow={Card.TRIPLE} />);
    expect(actualTriple).toMatchSnapshot();
  });
});
