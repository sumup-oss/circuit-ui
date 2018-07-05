import React from 'react';
import PaymentMethodIcon from './PaymentMethodIcon';

describe('PaymentMethodIcon', () => {
  const iconId = 'visa';
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(
      <PaymentMethodIcon size={PaymentMethodIcon.KILO} iconId={iconId} />
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests
   */
  it('should render the specified icon', () => {
    const wrapper = mount(
      <PaymentMethodIcon size={PaymentMethodIcon.BYTE} iconId={iconId} />
    );

    const iconComponent = wrapper.find(`[aria-label="icon ${iconId}"]`);
    expect(iconComponent).toHaveLength(1);
    expect(iconComponent).toIncludeText(`${iconId}.svg`);
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <PaymentMethodIcon size={PaymentMethodIcon.GIGA} iconId={iconId} />
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
