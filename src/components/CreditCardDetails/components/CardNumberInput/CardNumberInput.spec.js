import React from 'react';

import { CardNumberInput, cardSchemeIcons } from '..';
import { schemes as cardSchemes } from '../..';
import Label from '../../../Label';
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
      value=""
    />
  );
  const manySchemesComponent = (
    <CardNumberInput
      acceptedCardSchemes={manySchemeIcons}
      onChange={() => {}}
      detectedCardScheme=""
      name="creditCardInput"
      value=""
    />
  );

  /**
   * Style tests.
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
    const disabledProps = wrapper
      .dive()
      .find('SchemeIconWrapper')
      .map(el => el.prop('disabled'));
    const disabledWrappersCount = disabledProps.reduce(
      (acc, prop) => acc + prop,
      0
    );
    expect(disabledWrappersCount).toBe(3);
    const actualStyles = create(detectedComponent);
    expect(actualStyles).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(emptyComponent);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
