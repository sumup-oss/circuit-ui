import React from 'react';

import Button from '.';

describe('Button', () => {
  it('should provide the KILO constant', () => {
    const actual = Button.KILO;
    expect(actual).toMatchSnapshot();
  });

  it('should provide the MEGA constant', () => {
    const actual = Button.MEGA;
    expect(actual).toMatchSnapshot();
  });

  it('should provide the GIGA constant', () => {
    const actual = Button.GIGA;
    expect(actual).toMatchSnapshot();
  });

  /**
   * Style snapshot testing via react test renderer and emotions snapshot
   * serializer.
   */
  it('should have primary button styles', () => {
    const actual = create(<Button>Button</Button>).toJSON();
    expect(actual).toMatchSnapshot();
  });

  it('should have disabled primary button styles', () => {
    const actual = create(<Button disabled>Disabled button</Button>).toJSON();
    expect(actual).toMatchSnapshot();
  });

  it('should have flat primary button styles', () => {
    const actual = create(<Button flat>Flat button</Button>).toJSON();
    expect(actual).toMatchSnapshot();
  });

  it('should have flat disabled primary button styles', () => {
    const actual = create(
      <Button flat disabled>
        Flat button
      </Button>
    ).toJSON();
    expect(actual).toMatchSnapshot();
  });

  /**
   * Testing button logic, for using either a <button> or <a> element.
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
