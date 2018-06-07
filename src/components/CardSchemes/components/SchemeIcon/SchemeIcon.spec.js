import React from 'react';
import { keys } from 'lodash';
import SchemeIcon from './SchemeIcon';
// eslint-disable-next-line max-len
import schemeMap from '../../../CreditCardDetails/components/scheme-icons/card-scheme-map';

describe('SchemeIcon', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(
      <div>
        {keys(schemeMap).map(schemeId => (
          <SchemeIcon key={schemeId} schemeId={schemeId} />
        ))}
      </div>
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <div>
        {keys(schemeMap).map(schemeId => (
          <SchemeIcon key={schemeId} schemeId={schemeId} />
        ))}
      </div>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
