import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Manager, Reference, Popper } from 'react-popper';
import styled from 'react-emotion';

import {
  TOP,
  BOTTOM,
  LEFT,
  RIGHT,
  START,
  END,
  CENTER
} from '../../util/constants';
import { positionPropType, alignPropType } from '../../util/shared-prop-types';
import { toPopperPlacement, popperModifiers } from './PopoverService';

const ButtonWrapper = styled('div')`
  label: popover__button-wrapper;
  display: inline-block;
`;

class Popover extends Component {
  static TOP = TOP;
  static BOTTOM = BOTTOM;
  static LEFT = LEFT;
  static RIGHT = RIGHT;

  static START = START;
  static END = END;
  static CENTER = CENTER;

  static propTypes = {
    /**
     * function rendering the popover
     */
    renderPopover: PropTypes.func.isRequired,
    /**
     * function rendering the reference (button or something clickable)
     */
    renderReference: PropTypes.func.isRequired,
    /**
     * placement of the popover relative to the button
     */
    position: positionPropType,
    /**
     * alignment of the popover relative to the button
     */
    align: alignPropType
  };

  static defaultProps = {
    position: Popover.BOTTOM,
    align: Popover.START
  };

  state = { isOpen: false };

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick, false);
  }

  handleDocumentClick = ({ target }) => {
    const isWithinPopover = this.popoverRef && this.popoverRef.contains(target);
    const isWithinButton = this.buttonRef && this.buttonRef.contains(target);

    if (!isWithinButton && !isWithinPopover) {
      this.handleOutsideClick();
    }
  };

  buttonRef = null;
  popoverRef = null;

  receiveButtonRef = ref => {
    this.buttonRef = ref;
  };

  receivePopoverRef = ref => {
    this.popoverRef = ref;
  };

  handleClick = () => this.setState(({ isOpen }) => ({ isOpen: !isOpen }));

  handleOutsideClick = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { renderPopover, renderReference, position, align } = this.props;
    const { isOpen } = this.state;

    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <ButtonWrapper
              innerRef={this.receiveButtonRef}
              onClick={this.handleClick}
            >
              <div ref={ref}>{renderReference({ isOpen })}</div>
            </ButtonWrapper>
          )}
        </Reference>
        <Popper
          placement={toPopperPlacement(position, align)}
          modifiers={popperModifiers}
        >
          {({ ref, style }) =>
            isOpen && (
              <div ref={this.receivePopoverRef}>
                <div {...{ ref, style }}>{renderPopover()}</div>
              </div>
            )
          }
        </Popper>
      </Manager>
    );
  }
}

/**
 * @component
 */
export default Popover;
