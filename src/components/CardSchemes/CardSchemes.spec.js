import React from 'react';
import { keys } from 'lodash/fp';

import CardSchemes from './CardSchemes';
// eslint-disable-next-line max-len
import schemeMap from '../CreditCardDetails/components/scheme-icons/card-scheme-icons';

describe('CardSchemes', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(
      <CardSchemes size={CardSchemes.GIGA} iconIds={keys(schemeMap)} />
    );
    expect(actual).toMatchSnapshot();
  });

  it('should render each icon specified in the "iconsIds" prop', () => {
    const iconIds = ['visa', 'mastercard'];
    const wrapper = mount(<CardSchemes iconIds={iconIds} />);

    iconIds.forEach(iconId => {
      const iconNodes = wrapper.find(`[aria-label="icon ${iconId}"]`);
      expect(iconNodes).toHaveLength(1);
      expect(iconNodes).toIncludeText(`${iconId}.svg`);
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <CardSchemes size={CardSchemes.GIGA} iconIds={keys(schemeMap)} />
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
