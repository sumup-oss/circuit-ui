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
      <IconInput>{props => <RenderDummy {...props} />}</IconInput>
    );
    expect(actual).toMatchSnapshot();
  });

  it('should allow rendering the icon on the right', () => {
    const actual = create(
      <IconInput iconPosition={IconInput.RIGHT}>
        {props => <RenderDummy {...props} />}
      </IconInput>
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
        <IconInput>
          {props => (
            <RenderDummy {...props} id="icon-input" name="icon-input" />
          )}
        </IconInput>
      </Label>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
