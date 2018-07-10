import React from 'react';

import Button from '../../Button';

describe('PlainButton', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Button plain>Link</Button>);
    expect(actual).toMatchSnapshot();
  });

  it('should render with href', () => {
    const actual = create(
      <Button plain href="example">
        Button
      </Button>
    );
    expect(actual).toMatchSnapshot();
  });

  it('should have primary styles', () => {
    const actual = create(
      <Button plain primary>
        Button
      </Button>
    );
    expect(actual).toMatchSnapshot();
  });

  it('should have kilo link styles', () => {
    const actual = create(
      <Button plain size={Button.KILO}>
        Button
      </Button>
    );
    expect(actual).toMatchSnapshot();
  });

  it('should have mega link styles', () => {
    const actual = create(
      <Button plain size={Button.MEGA}>
        Button
      </Button>
    );
    expect(actual).toMatchSnapshot();
  });

  it('should have giga link styles', () => {
    const actual = create(
      <Button plain size={Button.GIGA}>
        Button
      </Button>
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines when used as anchor', async () => {
    const wrapper = renderToHtml(
      <Button plain href="http://accessibility.com">
        Link
      </Button>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });

  it('should meet accessibility guidelines when used as button', async () => {
    const wrapper = renderToHtml(
      <Button plain onClick={() => {}}>
        Link
      </Button>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
