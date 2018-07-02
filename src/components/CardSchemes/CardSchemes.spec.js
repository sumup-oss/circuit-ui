import React from 'react';
import { keys, values } from 'lodash/fp';

import CardSchemes from './CardSchemes';
import PaymentMethodIcon from './components/PaymentMethodIcon';
// eslint-disable-next-line max-len
import schemeMap, {
  iconComponents
} from '../CreditCardDetails/components/scheme-icons/card-scheme-icons';

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
    const actual = mount(
      <div>
        {keys(schemeMap).map(iconId => (
          <PaymentMethodIcon
            key={iconId}
            size={PaymentMethodIcon.BYTE}
            iconId={iconId}
          />
        ))}
      </div>
    );

    values(iconComponents).forEach(icon => {
      expect(actual.find(icon)).toHaveLength(1);
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
