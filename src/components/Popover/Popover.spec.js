import React from 'react';

import Popover from '.';

const positions = [Popover.TOP, Popover.BOTTOM, Popover.LEFT, Popover.RIGHT];
const alignments = [Popover.START, Popover.END, Popover.CENTER];

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

  positions.forEach(position => {
    alignments.forEach(alignment => {
      it(`should render with position ${position} and alignment ${alignment}`, () => {
        const actual = create(
          <Popover
            position={position}
            align={alignment}
            renderReference={() => <span />}
            renderPopover={() => <span />}
          />
        );
        expect(actual).toMatchSnapshot();
      });
    });
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

  /**
   * Logic tests.
   */
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
