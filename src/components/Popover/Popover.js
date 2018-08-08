import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Manager, Reference, Popper } from 'react-popper';
import styled, { css } from 'react-emotion';
import Portal from '../Portal';

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

const ReferenceWrapper = styled('div')`
  label: popover__button-wrapper;
  display: inline-block;
  &:focus {
    outline: none;
  }
`;

const basePopoverWrapperStyles = ({ theme }) => css`
  label: popover;
  z-index: ${theme.zIndex.popover};
`;

const customZIndexWrapperStyles = ({ zIndex }) =>
  zIndex &&
  css`
    z-index: ${zIndex};
  `;

const PopoverWrapper = styled('div')(
  basePopoverWrapperStyles,
  customZIndexWrapperStyles
);

const arrowUpStyles = css`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -100%);
`;

const arrowDownStyles = css`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 100%);
`;

const arrowLeftStyles = css`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-100%, -50%);
`;

const arrowRightStyles = css`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(100%, -50%);
`;

const oppositeDirection = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up'
};

const arrowStyles = {
  up: arrowUpStyles,
  down: arrowDownStyles,
  left: arrowLeftStyles,
  right: arrowRightStyles
};

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
    renderReference: PropTypes.func,
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
    onOutsideClickClose: PropTypes.func.isRequired,
    /**
     * A custom z-index for the popover
     */
    zIndex: PropTypes.number,
    onClose: PropTypes.func,
    usePortal: PropTypes.bool,
    modifiers: PropTypes.shape(),
    arrowRenderer: PropTypes.func,
    referenceElement: PropTypes.instanceOf(HTMLElement)
  };

  static defaultProps = {
    isOpen: false,
    position: Popover.BOTTOM,
    align: Popover.START,
    zIndex: null,
    onClose: () => {},
    usePortal: false,
    modifiers: {},
    arrowRenderer: () => null,
    renderReference: () => null,
    referenceElement: null
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

    if (this.props.isOpen && !isWithinButton && !isWithinPopover) {
      this.props.onOutsideClickClose(target);
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
      arrowRenderer,
      renderPopover,
      renderReference,
      referenceElement,
      position,
      align,
      isOpen,
      zIndex,
      modifiers,
      usePortal,
      ...others
    } = this.props;

    const reference = !referenceElement && (
      <Reference>
        {({ ref }) => (
          <ReferenceWrapper
            innerRef={this.receiveButtonRef}
            onClick={this.handleReferenceClick}
          >
            <div ref={ref}>{renderReference()}</div>
          </ReferenceWrapper>
        )}
      </Reference>
    );

    const popper = isOpen && (
      <Popper
        {...others}
        referenceElement={referenceElement}
        placement={toPopperPlacement(position, align)}
        modifiers={{ ...modifiers, ...popperModifiers }}
      >
        {({ ref, style, placement }) =>
          isOpen && (
            <PopoverWrapper
              style={style}
              innerRef={this.receivePopoverRef}
              zIndex={zIndex}
            >
              <div ref={ref}>
                {renderPopover()}
                {!!arrowRenderer &&
                  arrowRenderer(arrowStyles[oppositeDirection[placement]])}
              </div>
            </PopoverWrapper>
          )
        }
      </Popper>
    );

    return (
      <Manager>
        {reference}
        {usePortal ? <Portal>{popper}</Portal> : popper}
      </Manager>
    );
  }
}

/**
 * @component
 */
export default Popover;
