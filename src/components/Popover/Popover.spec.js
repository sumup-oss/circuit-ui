import React from 'react';

import Popover from '.';

const positions = [Popover.TOP, Popover.BOTTOM, Popover.LEFT, Popover.RIGHT];
const alignments = [Popover.START, Popover.END, Popover.CENTER];

const defaultProps = {
  // eslint-disable-next-line react/display-name
  renderReference: () => <span />,
  // eslint-disable-next-line react/display-name
  renderPopover: () => <div />,
  onReferenceClickClose: () => {},
  onOutsideClickClose: () => {}
};

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
    const actual = create(<Popover isOpen {...defaultProps} />);
    expect(actual).toMatchSnapshot();
  });

  positions.forEach(position => {
    alignments.forEach(alignment => {
      it(`should render with position ${position} and alignment ${alignment}`, () => {
        const actual = create(
          <Popover
            isOpen
            position={position}
            align={alignment}
            {...defaultProps}
          />
        );
        expect(actual).toMatchSnapshot();
      });
    });
  });

  it('should render nothing without isOpen=false', () => {
    const actual = mount(<Popover isOpen={false} {...defaultProps} />);
    expect(actual.find('Popper')).toHaveLength(0);
  });

  it('it should call onReferenceClickClose on clicked reference when isOpen=true', () => {
    const onReferenceClickClose = jest.fn();
    const actual = mount(
      <Popover
        isOpen
        {...defaultProps}
        onReferenceClickClose={onReferenceClickClose}
      />
    );
    actual
      .find('Styled(div)')
      .first()
      .simulate('click');
    expect(onReferenceClickClose).toHaveBeenCalledTimes(1);
  });

  it('should not render <Reference> component when referenceElement is passed', () => {
    const dummyElement = document.createElement('div');
    const actual = shallow(
      <Popover isOpen {...defaultProps} referenceElement={dummyElement} />
    );
    expect(actual.find('Reference')).toHaveLength(0);
    expect(actual.find('Popper').prop('referenceElement')).toBe(dummyElement);
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Popover isOpen {...defaultProps} />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
