import React from 'react';

import Popover from '.';

// FMI: https://github.com/FezVrasta/popper.js/issues/478
jest.mock('popper.js', () => {
  const PopperJS = jest.requireActual('popper.js');

  return class Popper {
    static placements = PopperJS.placements;

    constructor() {
      return {
        destroy: () => {},
        scheduleUpdate: () => {}
      };
    }
  };
});

describe('Popover', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(
      <Popover renderReference={() => <span />} renderPopover={() => <div />} />
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <Popover renderReference={() => <span />} renderPopover={() => <div />} />
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });

  const placements = ['top', 'right', 'bottom', 'left'];
  const alignments = ['start', 'end', 'center'];

  placements.forEach(placement => {
    alignments.forEach(alignment => {
      it(`should render with placement ${placement} and alignment ${alignment}`, () => {
        const actual = create(
          <Popover
            placement={placement}
            align={alignment}
            renderReference={() => <span />}
            renderPopover={() => <span />}
          />
        );
        expect(actual).toMatchSnapshot();
      });
    });
  });

  it('calls renderPopover on button click', () => {
    const renderFn = jest.fn();
    const actual = mount(
      <Popover
        renderReference={() => <button>Button</button>}
        renderPopover={renderFn}
      />
    );
    const button = actual.find('button');

    expect(renderFn).toHaveBeenCalledTimes(0);
    button.simulate('click');
    expect(renderFn).toHaveBeenCalled();
  });

  it('calls renderReference with isOpen', () => {
    const renderFn = jest.fn(() => <button>button</button>);
    const actual = mount(
      <Popover renderReference={renderFn} renderPopover={() => <span />} />
    );
    const button = actual.find('button');
    button.simulate('click');

    expect(renderFn).toHaveBeenCalledWith({ isOpen: true });
  });
});
