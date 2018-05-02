import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Manager, Reference, Popper } from 'react-popper';
import styled from 'react-emotion';

const modifiers = {
  offset: { enabled: true, offset: '0,10' },
  flip: { enabled: true }
};

class Popover extends Component {
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
    placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    /**
     * alignment of the popover relative to the button
     */
    align: PropTypes.oneOf(['start', 'end', 'center'])
  };

  static defaultProps = {
    placement: 'bottom',
    align: 'start'
  };

  state = { isOpen: false };

  componentDidMount() {
    document.addEventListener('click', this.onDocumentClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick, false);
  }

  onDocumentClick = ({ target }) => {
    if (this.popoverRef && this.popoverRef.contains(target)) {
      return;
    }
    if (this.buttonRef && this.buttonRef.contains(target)) {
      return;
    }

    this.handleOutsideClick();
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
    const { renderPopover, renderReference, placement, align } = this.props;
    const { isOpen } = this.state;

    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <ButtonWrap
              innerRef={this.receiveButtonRef}
              onClick={this.handleClick}
            >
              <div ref={ref}>{renderReference({ isOpen })}</div>
            </ButtonWrap>
          )}
        </Reference>
        <Popper
          placement={toPopperPlacement(placement, align)}
          modifiers={modifiers}
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

function toPopperPlacement(placement, align) {
  return placement + (align !== 'center' ? `-${align}` : '');
}

const ButtonWrap = styled('div')`
  display: inline-block;
`;

/**
 * @component
 */
export default Popover;
