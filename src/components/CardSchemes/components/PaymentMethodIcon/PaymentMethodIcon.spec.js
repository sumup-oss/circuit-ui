import React from 'react';
import { keys } from 'lodash/fp';
import PaymentMethodIcon from './PaymentMethodIcon';
// eslint-disable-next-line max-len
import schemeMap from '../../../CreditCardDetails/components/scheme-icons/card-scheme-icons';
// eslint-disable-next-line max-len
import Mastercard from '../../../CreditCardDetails/components/scheme-icons/icons/mastercard.svg';

describe('PaymentMethodIcon', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(
      <div>
        {keys(schemeMap).map(iconId => (
          <PaymentMethodIcon
            size={PaymentMethodIcon.KILO}
            key={iconId}
            iconId={iconId}
          />
        ))}
      </div>
    );
    expect(actual).toMatchSnapshot();
  });

  it('should render Mastercard svg icon', () => {
    const actual = mount(
      <PaymentMethodIcon size={PaymentMethodIcon.BYTE} iconId="mastercard" />
    );

    expect(actual.find(Mastercard)).toHaveLength(1);
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <div>
        {keys(schemeMap).map(iconId => (
          <PaymentMethodIcon
            size={PaymentMethodIcon.GIGA}
            key={iconId}
            iconId={iconId}
          />
        ))}
      </div>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
