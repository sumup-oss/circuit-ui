import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Manager, Reference, Popper } from 'react-popper';
import styled from 'react-emotion';

import { zIndex } from '../../themes/default';

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

const PopoverWrapper = styled('div')`
  z-index: ${zIndex.popover};
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
     * isOpen controlled prop
     */
    isOpen: PropTypes.bool,
    /**
     * function rendering the popover
     */
    renderPopover: PropTypes.func.isRequired,
    /**
     * function rendering the reference (button or something clickable)
     */
    renderReference: PropTypes.func.isRequired,
    /**
     * placement of the popover relative to the reference
     */
    position: positionPropType,
    /**
     * alignment of the popover relative to the reference
     */
    align: alignPropType,
    /**
     * A callback that is called when the popover should be closed when reference is clicked in an open state
     */
    onReferenceClickClose: PropTypes.func.isRequired,
    /**
     * A callback that is called on click outside the popover wrapper or the reference
     */
    onOutsideClickClose: PropTypes.func.isRequired
  };

  static defaultProps = {
    isOpen: false,
    position: Popover.BOTTOM,
    align: Popover.START
  };

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick, true);
  }

  handleDocumentClick = ({ target }) => {
    const isWithinPopover = this.popoverRef && this.popoverRef.contains(target);
    const isWithinButton = this.buttonRef && this.buttonRef.contains(target);

    if (!isWithinButton && !isWithinPopover) {
      this.props.onOutsideClickClose();
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

  handleReferenceClick = () => {
    const { isOpen } = this.props;
    if (isOpen) {
      this.props.onReferenceClickClose();
    }
  };

  render() {
    const {
      renderPopover,
      renderReference,
      position,
      align,
      isOpen
    } = this.props;

    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <ButtonWrapper
              innerRef={this.receiveButtonRef}
              onClick={this.handleReferenceClick}
            >
              <div ref={ref}>{renderReference()}</div>
            </ButtonWrapper>
          )}
        </Reference>
        {isOpen && (
          <Popper
            placement={toPopperPlacement(position, align)}
            modifiers={popperModifiers}
          >
            {({ ref, style }) => (
              <PopoverWrapper style={style} innerRef={this.receivePopoverRef}>
                <div ref={ref}>{renderPopover()}</div>
              </PopoverWrapper>
            )}
          </Popper>
        )}
      </Manager>
    );
  }
}

/**
 * @component
 */
export default Popover;
