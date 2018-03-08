import React from 'react';
import styled from 'react-emotion';

import Label from '../Label';

import IconInput from '.';

const RenderDummy = styled('div')();

describe('IconInput', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(
      <IconInput iconLeft={props => <RenderDummy {...props} />} />
    );
    expect(actual).toMatchSnapshot();
  });

  it('should allow rendering the icon on the right', () => {
    const actual = create(
      <IconInput iconRight={props => <RenderDummy {...props} />} />
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <Label htmlFor="icon-input">
        Label
        <IconInput
          iconLeft={props => (
            <RenderDummy {...props} id="icon-input" name="icon-input" />
          )}
        />
      </Label>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
