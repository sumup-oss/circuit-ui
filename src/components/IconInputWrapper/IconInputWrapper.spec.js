import React from 'react';
import styled from 'react-emotion';

import IconInputWrapper from '.';

const RenderDummy = styled('div')();

describe('IconInputWrapper', () => {
  it("should have it's base styles", () => {
    const actual = create(
      <IconInputWrapper
        selector="some-wrapper"
        icon={props => <RenderDummy {...props} />}
        input={props => <RenderDummy {...props} />}
      />
    );
    expect(actual).toMatchSnapshot();
  });

  it('should allow rendering the icon on the right', () => {
    const actual = create(
      <IconInputWrapper
        selector="some-wrapper"
        iconPosition="right"
        icon={props => <RenderDummy {...props} />}
        input={props => <RenderDummy {...props} />}
      />
    );
    expect(actual).toMatchSnapshot();
  });
});
