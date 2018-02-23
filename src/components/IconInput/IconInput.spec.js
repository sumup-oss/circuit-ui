import React from 'react';
import styled from 'react-emotion';

import IconInput from '.';

const RenderDummy = styled('div')();

describe('IconInput', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(
      <IconInput
        selector="some-wrapper"
        icon={props => <RenderDummy {...props} />}
        input={props => <RenderDummy {...props} />}
      />
    );
    expect(actual).toMatchSnapshot();
  });

  it('should allow rendering the icon on the right', () => {
    const actual = create(
      <IconInput
        selector="some-wrapper"
        iconPosition="right"
        icon={props => <RenderDummy {...props} />}
        input={props => <RenderDummy {...props} />}
      />
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <IconInput
        selector="some-wrapper"
        icon={props => <RenderDummy {...props} />}
        input={props => <RenderDummy {...props} />}
      />
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
