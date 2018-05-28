import React from 'react';

import Button from './Button';

describe('Button', () => {
  /**
   * Style tests.
   */
  it('should have button styles', () => {
    const actual = create(<Button>Button</Button>);
    expect(actual).toMatchSnapshot();
  });

  it('should have kilo button styles', () => {
    const actual = create(<Button size={Button.KILO}>Button</Button>);
    expect(actual).toMatchSnapshot();
  });

  it('should have mega button styles', () => {
    const actual = create(<Button size={Button.MEGA}>Button</Button>);
    expect(actual).toMatchSnapshot();
  });

  it('should have giga button styles', () => {
    const actual = create(<Button size={Button.GIGA}>Button</Button>);
    expect(actual).toMatchSnapshot();
  });

  it('should have disabled button styles', () => {
    const actual = create(<Button disabled>Disabled button</Button>);
    expect(actual).toMatchSnapshot();
  });

  it('should have flat button styles', () => {
    const actual = create(<Button flat>Flat button</Button>);
    expect(actual).toMatchSnapshot();
  });

  it('should have flat disabled button styles', () => {
    const actual = create(
      <Button flat disabled>
        Flat button
      </Button>
    );
    expect(actual).toMatchSnapshot();
  });

  it('should have secondary button styles', () => {
    const actual = create(<Button secondary>Secondary button</Button>);
    expect(actual).toMatchSnapshot();
  });

  it('should have secondary disabled button styles', () => {
    const actual = create(
      <Button secondary disabled>
        Secondary disabled button
      </Button>
    );
    expect(actual).toMatchSnapshot();
  });

  it('should have secondary flat button styles', () => {
    const actual = create(
      <Button secondary flat>
        Secondary flat button
      </Button>
    );
    expect(actual).toMatchSnapshot();
  });

  it('should have stretch button styles', () => {
    const actual = create(<Button stretch>Stretched button</Button>);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Button>Button</Button>);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });

  /**
   * Logic tests.
   */
  describe('as anchor element', () => {
    it('should become a link when passed an href prop', () => {
      const wrapper = mount(
        <div>
          <Button href="#">Link Button</Button>
        </div>
      );
      expect(wrapper.find('a')).toBePresent();
      expect(wrapper.find('a')).toHaveProp('href', '#');
    });

    it('should accept a target prop', () => {
      const wrapper = mount(
        <div>
          <Button href="#" target="_blank">
            Link Button
          </Button>
        </div>
      );
      expect(wrapper.find('a')).toBePresent();
      expect(wrapper.find('a')).toHaveProp('target', '_blank');
    });
  });
});
