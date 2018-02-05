import React from 'react';

import Tooltip from '.';

describe('Tooltip', () => {
  it('aligns to the center', () => {
    const component = create(
      <Tooltip align={Tooltip.Center} content="The tooltip content">
        Something with tooltip
      </Tooltip>
    ).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('aligns to the right', () => {
    const component = create(
      <Tooltip align={Tooltip.Right} content="The tooltip content">
        Something with tooltip
      </Tooltip>
    ).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('aligns to the left', () => {
    const component = create(
      <Tooltip align={Tooltip.Left} content="The tooltip content">
        Something with tooltip
      </Tooltip>
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
