import React from 'react';

import Tooltip from '.';

describe('Tooltip', () => {
  const DummyIcon = () => (
    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg">
      <path />
    </svg>
  );

  it('should align to the center', () => {
    const component = create(
      <Tooltip align={Tooltip.CENTER} content="The tooltip content">
        Something with tooltip
      </Tooltip>
    );
    expect(component).toMatchSnapshot();
  });

  it('should align to the right', () => {
    const component = create(
      <Tooltip align={Tooltip.RIGHT} content="The tooltip content">
        Something with tooltip
      </Tooltip>
    );
    expect(component).toMatchSnapshot();
  });

  it('should align to the left', () => {
    const component = create(
      <Tooltip align={Tooltip.LEFT} content="The tooltip content">
        Something with tooltip
      </Tooltip>
    );
    expect(component).toMatchSnapshot();
  });

  it('should render with icon', () => {
    const component = create(
      <Tooltip align={Tooltip.CENTER} content="The tooltip content">
        <span>Text and a</span>
        <DummyIcon />
      </Tooltip>
    );
    expect(component).toMatchSnapshot();
  });

  it('should accept icon as content', () => {
    const component = create(
      <Tooltip align={Tooltip.CENTER} content={<DummyIcon />}>
        Some text
      </Tooltip>
    );
    expect(component).toMatchSnapshot();
  });
});
