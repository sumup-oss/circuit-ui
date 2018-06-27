import React from 'react';
import { keys } from 'lodash';

import CardSchemes from './CardSchemes';
// eslint-disable-next-line max-len
import schemeMap from '../CreditCardDetails/components/scheme-icons/card-scheme-icons';

describe('CardSchemes', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(
      <CardSchemes size={CardSchemes.GIGA} schemeIds={keys(schemeMap)} />
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <CardSchemes size={CardSchemes.GIGA} schemeIds={keys(schemeMap)} />
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
