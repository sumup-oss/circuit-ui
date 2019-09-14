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

import { CardNumberInput, cardSchemeIcons } from '..';
import { schemes as cardSchemes } from '../..';
import { reduce } from '../../../../util/fp';

describe('CardNumberInput', () => {
  const { SCHEMES } = cardSchemes;
  const getIconComponents = reduce(
    (acc, scheme) => ({ ...acc, [scheme]: cardSchemeIcons[scheme] }),
    {}
  );

  const schemes = [
    SCHEMES.MASTERCARD,
    SCHEMES.VISA,
    SCHEMES.DINERS,
    SCHEMES.JCB
  ];
  const schemeIcons = getIconComponents(schemes);
  const manySchemes = [
    SCHEMES.MASTERCARD,
    SCHEMES.VISA,
    SCHEMES.DINERS,
    SCHEMES.DISCOVER,
    SCHEMES.JCB,
    SCHEMES.ELO,
    SCHEMES.MAESTRO
  ];
  const manySchemeIcons = getIconComponents(manySchemes);

  const detectedComponent = (
    <CardNumberInput
      acceptedCardSchemes={schemeIcons}
      onChange={() => {}}
      detectedCardScheme={SCHEMES.VISA}
      name="creditCardInput"
      value="4485 7197 7461 1397"
    />
  );
  const emptyComponent = (
    <CardNumberInput
      acceptedCardSchemes={schemeIcons}
      onChange={() => {}}
      detectedCardScheme={SCHEMES.VISA}
      name="creditCardInput"
    />
  );
  const manySchemesComponent = (
    <CardNumberInput
      acceptedCardSchemes={manySchemeIcons}
      onChange={() => {}}
      detectedCardScheme=""
      name="creditCardInput"
    />
  );

  /**
   * Style tests.
   *
   * Using render in these tests, because text-mask relies
   * on refs and those are not well supported in react's
   * test renderer.
   */

  it('should render with default styles', () => {
    const actual = create(emptyComponent);
    expect(actual).toMatchSnapshot();
  });

  it('should render with styles for more than 5 card schemes', () => {
    const actual = create(manySchemesComponent);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */

  it('should render all but the detected card scheme with reduced opacity', () => {
    const wrapper = shallow(detectedComponent);
    const disabledProps = wrapper.find('li').map(el => el.prop('disabled'));
    const disabledWrappersCount = disabledProps.reduce(
      (acc, prop) => acc + prop,
      0
    );
    expect(disabledWrappersCount).toBe(3);
    const actualStyles = create(detectedComponent);
    expect(actualStyles).toMatchSnapshot();
  });

  // FIXME: Figure out what's the best combination of type/autocomplete for
  // this input.
  it.skip('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<form>{emptyComponent}</form>);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
