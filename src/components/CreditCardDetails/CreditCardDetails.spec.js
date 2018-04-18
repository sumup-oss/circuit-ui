import React from 'react';

import CreditCardDetails from '.';

describe('CreditCardDetails', () => {
  const createComponent = withInfoRenderProp => {
    const renderSecurityCodeInfo = ({ isShowingInfo, onHideInfo }) =>
      isShowingInfo && (
        <button
          type="button"
          onClick={onHideInfo}
          data-test="security-code-hide-info"
        >
          Hide info
        </button>
      );
    const props = {
      nameOnCard: <div data-test="name-on-card" />,
      cardNumber: <div data-test="card-number" />,
      expiryDate: <div data-test="expiry-date" />,
      // eslint-disable-next-line
      renderSecurityCodeInput: ({ onShowInfo }) => (
        <div data-test="security-code">
          {withInfoRenderProp && (
            <button
              type="button"
              onClick={onShowInfo}
              data-test="security-code-show-info"
            />
          )}
        </div>
      ),
      ...(withInfoRenderProp ? { renderSecurityCodeInfo } : {})
    };

    return <CreditCardDetails {...props} />;
  };

  const component = createComponent();
  const componentWithInfo = createComponent(true);

  /**
   * Style tests.
   */

  it('should render with default styles', () => {
    const actual = create(component);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */

  it('should render the name on card', () => {
    const actual = shallow(component).find('[data-test="name-on-card"]');
    expect(actual).toHaveLength(1);
  });

  it('should render the card-number', () => {
    const actual = shallow(component).find('[data-test="card-number"]');
    expect(actual).toHaveLength(1);
  });

  it('should render the expiry date', () => {
    const actual = shallow(component).find('[data-test="expiry-date"]');
    expect(actual).toHaveLength(1);
  });

  it('should render the security code', () => {
    const actual = shallow(component).find('[data-test="security-code"]');
    expect(actual).toHaveLength(1);
  });

  describe('when using the renderSecurityCodeInfo render prop', () => {
    const hideButtonSelector = '[data-test="security-code-hide-info"]';
    const showButtonSelector = '[data-test="security-code-show-info"]';

    it('should not show the info by default', () => {
      const wrapper = mount(componentWithInfo);
      const hideButton = wrapper.find(hideButtonSelector);
      expect(hideButton).toHaveLength(0);
    });

    it('should show the "show info button"', () => {
      const wrapper = mount(componentWithInfo);
      const showButton = wrapper.find(showButtonSelector);
      expect(showButton).toHaveLength(1);
    });

    it('should show the info after clicking the "show info button"', () => {
      const wrapper = mount(componentWithInfo);
      const showButton = wrapper.find(showButtonSelector);
      showButton.simulate('click');
      wrapper.update();
      const hideButton = wrapper.find(hideButtonSelector);
      expect(hideButton).toHaveLength(1);
    });

    it('should hide the info after clicking the "hide info button"', () => {
      const wrapper = mount(componentWithInfo);
      const showButton = wrapper.find(showButtonSelector);
      showButton.simulate('click');
      wrapper.update();
      const hideButton = wrapper.find(hideButtonSelector);
      hideButton.simulate('click');
      wrapper.update();
      const missingHideButton = wrapper.find(hideButtonSelector);
      expect(missingHideButton).toHaveLength(0);
    });
  });

  /**
   * Accessibility tests.
   */

  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(component);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
