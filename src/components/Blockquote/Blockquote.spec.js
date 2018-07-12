import React from 'react';

import Blockquote from './Blockquote';

describe('Blockquote', () => {
  const quote = `
  Lorem ipsum dolor amet echo park activated charcoal banjo deep
  crucifix pinterest yr af tumeric literally. Tbh four loko tattooed
  kickstarter artisan.
  `;

  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Blockquote>{quote}</Blockquote>);
    expect(actual).toMatchSnapshot();
  });

  it('should render with mega styles', () => {
    const actual = create(
      <Blockquote size={Blockquote.MEGA}>{quote}</Blockquote>
    );
    expect(actual).toMatchSnapshot();
  });

  it('should render with giga styles', () => {
    const actual = create(
      <Blockquote size={Blockquote.GIGA}>{quote}</Blockquote>
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Blockquote>{quote}</Blockquote>);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
