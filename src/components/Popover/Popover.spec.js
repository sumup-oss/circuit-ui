/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
    const { queryByTestId } = render(
      <Popover isOpen={false} {...defaultProps} />
    );
    expect(queryByTestId('popover-child')).toBeNull();
  });

  it('should call onReferenceClickClose on clicked reference when isOpen=true', () => {
    const onReferenceClickClose = jest.fn();
    const { getByTestId } = render(
      <Popover
        isOpen
        {...defaultProps}
        onReferenceClickClose={onReferenceClickClose}
      />
    );

    act(() => {
      fireEvent.click(getByTestId('popover-reference'));
    });

    expect(onReferenceClickClose).toHaveBeenCalledTimes(1);
  });

  it('should not render <Reference> component when referenceElement is passed', () => {
    const { queryByTestId } = render(
      <Popover isOpen {...defaultProps} referenceElement={<div />} />
    );
    expect(queryByTestId('popover-reference')).toBeNull();
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
