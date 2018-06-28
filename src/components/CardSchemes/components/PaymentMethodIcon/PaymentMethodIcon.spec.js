import React from 'react';
import { keys, values } from 'lodash/fp';
import PaymentMethodIcon from './PaymentMethodIcon';
// eslint-disable-next-line max-len
import schemeMap, {
  iconComponents
} from '../../../CreditCardDetails/components/scheme-icons/card-scheme-icons';

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
      <div>
        {keys(schemeMap).map(schemeId => (
          <PaymentMethodIcon
            key={schemeId}
            size={PaymentMethodIcon.BYTE}
            schemeId={schemeId}
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
