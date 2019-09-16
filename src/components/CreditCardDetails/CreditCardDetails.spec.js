/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';

import CreditCardDetails from '.';

describe('CreditCardDetails', () => {
  const createComponent = withInfoRenderProp => {
    const renderSecurityCodeInfo = ({ isShowingInfo, onHideInfo }) =>
      isShowingInfo && (
        <button
          type="button"
          onClick={onHideInfo}
          data-testid="security-code-hide-info"
        >
          Hide info
        </button>
      );
    const props = {
      nameOnCard: <div data-testid="name-on-card" />,
      cardNumber: <div data-testid="card-number" />,
      expiryDate: <div data-testid="expiry-date" />,
      // eslint-disable-next-line
      renderSecurityCodeInput: ({ onShowInfo }) => (
        <div data-testid="security-code">
          {withInfoRenderProp && (
            <button
              type="button"
              onClick={onShowInfo}
              data-testid="security-code-show-info"
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
    const { getByTestId } = render(component);
    const actual = getByTestId('name-on-card');
    expect(actual).toBeVisible();
  });

  it('should render the card number', () => {
    const { getByTestId } = render(component);
    const actual = getByTestId('card-number');
    expect(actual).toBeVisible();
  });

  it('should render the expiry date', () => {
    const { getByTestId } = render(component);
    const actual = getByTestId('expiry-date');
    expect(actual).toBeVisible();
  });

  it('should render the security code', () => {
    const { getByTestId } = render(component);
    const actual = getByTestId('security-code');
    expect(actual).toBeVisible();
  });

  describe('when using the renderSecurityCodeInfo render prop', () => {
    const hideButtonSelector = 'security-code-hide-info';
    const showButtonSelector = 'security-code-show-info';

    it('should not show the info by default', () => {
      const { queryByTestId } = render(componentWithInfo);
      const hideButton = queryByTestId(hideButtonSelector);
      expect(hideButton).toBeNull();
    });

    it('should show the "show info button"', () => {
      const { getByTestId } = render(componentWithInfo);
      const showButton = getByTestId(showButtonSelector);
      expect(showButton).toBeVisible();
    });

    it('should show the info after clicking the "show info button"', () => {
      const { getByTestId } = render(componentWithInfo);
      const showButton = getByTestId(showButtonSelector);

      act(() => {
        fireEvent.click(showButton);
      });

      const hideButton = getByTestId(hideButtonSelector);
      expect(hideButton).toBeVisible();
    });

    it('should hide the info after clicking the "hide info button"', () => {
      const { getByTestId, queryByTestId } = render(componentWithInfo);
      const showButton = getByTestId(showButtonSelector);

      act(() => {
        fireEvent.click(showButton);
      });

      const hideButton = getByTestId(hideButtonSelector);

      act(() => {
        fireEvent.click(hideButton);
      });

      const missingHideButton = queryByTestId(hideButtonSelector);
      expect(missingHideButton).toBeNull();
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
