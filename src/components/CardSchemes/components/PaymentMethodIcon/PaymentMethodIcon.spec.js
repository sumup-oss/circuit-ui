import React from 'react';
import { keys } from 'lodash';
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
        {keys(schemeMap).map(schemeId => (
          <PaymentMethodIcon
            size={PaymentMethodIcon.KILO}
            key={schemeId}
            schemeId={schemeId}
          />
        ))}
      </div>
    );
    expect(actual).toMatchSnapshot();
  });

  it('should render svg icon', () => {
    const actual = mount(
      <PaymentMethodIcon size={PaymentMethodIcon.BYTE} schemeId="mastercard" />
    );

    expect(actual.find(Mastercard)).toHaveLength(1);
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <div>
        {keys(schemeMap).map(schemeId => (
          <PaymentMethodIcon
            size={PaymentMethodIcon.GIGAƒ}
            key={schemeId}
            schemeId={schemeId}
          />
        ))}
      </div>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
