import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { withTheme } from 'emotion-theming';
import Modal from '../Modal';
import Slide from '../Slide';
import Card from '../../../Card';
import transitions from '../../transitions';
import { themePropType } from '../../../../util/shared-prop-types';

const anchorLeftStyles = ({ theme, anchor, docked }) =>
  anchor === 'left' &&
  css`
    left: 0;
    right: auto;
    ${docked && `border-right: 1px solid ${theme.palette.divider}`};
  `;

const anchorTopStyles = ({ theme, anchor, docked }) =>
  anchor === 'top' &&
  css`
    top: 0;
    left: 0;
    bottom: auto;
    right: 0;
    height: auto;
    max-height: 100vh;
    ${docked && `border-bottom: 1px solid ${theme.palette.divider}`};
  `;

const anchorRightStyles = ({ theme, anchor, docked }) =>
  anchor === 'right' &&
  css`
    left: auto;
    right: 0;
    ${docked && `border-left: 1px solid ${theme.palette.divider}`};
  `;

const anchorBottomStyles = ({ theme, anchor, docked }) =>
  anchor === 'bottom' &&
  css`
    top: auto;
    left: 0;
    bottom: 0;
    right: 0;
    height: auto;
    max-height: 100vh;
    ${docked && `border-top: 1px solid ${theme.palette.divider}`};
  `;

const DrawerContainer = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
  flex: 1 0 auto;
  z-index: ${({ theme }) => theme.zIndex.drawer};
  -webkit-overflow-scrolling: touch;
  position: fixed;
  top: 0;
  outline: none;
  ${anchorLeftStyles};
  ${anchorRightStyles};
  ${anchorTopStyles};
  ${anchorBottomStyles};
`;

const Docked = styled.div`
  flex: 0 0 auto;
`;

const oppositeDirection = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up'
};

export function isHorizontal(props) {
  return ['left', 'right'].indexOf(props.anchor) !== -1;
}

export function getAnchor(props) {
  return props.theme.direction === 'rtl' && isHorizontal(props)
    ? oppositeDirection[props.anchor]
    : props.anchor;
}

/**
 * The properties of the [Modal](/api/modal) component are available
 * when `variant="temporary"` is set.
 */
class Drawer extends React.Component {
  componentDidMount() {
    this.mounted = true;
  }

  // Let's assume that the Drawer will always be rendered on user space.
  // We use this state is order to skip the appear transition during the
  // initial mount of the component.
  mounted = false;

  render() {
    const {
      anchor: anchorProp,
      children,
      shadow,
      ModalProps: { BackdropProps: BackdropPropsProp, ...ModalProps } = {},
      onClose,
      open,
      CardProps,
      SlideProps,
      theme,
      transitionDuration,
      variant,
      ...other
    } = this.props;

    const anchor = getAnchor(this.props);
    const drawer = (
      <DrawerContainer
        anchor={anchor}
        shadow={variant === 'temporary' ? shadow : Card.SINGLE}
        docked={variant !== 'temporary'}
        {...CardProps}
      >
        {children}
      </DrawerContainer>
    );

    if (variant === 'permanent') {
      return <Docked {...other}>{drawer}</Docked>;
    }

    const slidingDrawer = (
      <Slide
        in={open}
        direction={oppositeDirection[anchor]}
        timeout={transitionDuration}
        appear={this.mounted}
        {...SlideProps}
      >
        {drawer}
      </Slide>
    );

    if (variant === 'persistent') {
      return <Docked {...other}>{slidingDrawer}</Docked>;
    }

    // variant === temporary
    return (
      <Modal
        BackdropProps={{
          ...BackdropPropsProp,
          transitionDuration
        }}
        {...ModalProps}
        open={open}
        onClose={onClose}
        {...other}
      >
        {slidingDrawer}
      </Modal>
    );
  }
}

Drawer.propTypes = {
  /**
   * Side from which the drawer will appear.
   */
  anchor: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
  /**
   * The contents of the drawer.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The shadow of the drawer.
   */
  shadow: PropTypes.oneOf([Card.SINGLE, Card.DOUBLE, Card.TRIPLE]),
  /**
   * Properties applied to the [`Modal`](/api/modal) element.
   */
  ModalProps: PropTypes.shape(Modal.propTypes),
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback
   */
  onClose: PropTypes.func,
  /**
   * If `true`, the drawer is open.
   */
  open: PropTypes.bool,
  /**
   * Properties applied to the [`Paper`](/api/paper) element.
   */
  CardProps: PropTypes.shape(Card.propTypes),
  /**
   * Properties applied to the [`Slide`](/api/slide) element.
   */
  SlideProps: PropTypes.shape(Slide.propTypes),
  /**
   * @ignore
   */
  theme: themePropType.isRequired,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number })
  ]),
  /**
   * The variant of drawer.
   */
  variant: PropTypes.oneOf(['permanent', 'persistent', 'temporary'])
};

Drawer.defaultProps = {
  anchor: 'left',
  shadow: 'single',
  open: false,
  transitionDuration: {
    enter: transitions.duration.enteringScreen,
    exit: transitions.duration.leavingScreen
  },
  variant: 'temporary', // Mobile first.
  SlideProps: {},
  CardProps: {},
  ModalProps: { open: false },
  onClose: () => {},
  children: null,
  className: null
};

export default withTheme(Drawer);
