import React from 'react';
import { withTheme } from 'emotion-theming';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { duration, reflow, getTransitionProps } from '../../styles/transitions';
import { themePropType } from '../../util/shared-prop-types';

const styles = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
};

/**
 * The Fade transition is used by the [Modal](/utils/modals) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
class Fade extends React.Component {
  handleEnter = node => {
    const { theme } = this.props;
    reflow(node); // So the animation always start from the start.

    const transitionProps = getTransitionProps(this.props, {
      mode: 'enter'
    });
    node.style.webkitTransition = theme.transitions.create(
      'opacity',
      transitionProps
    );
    node.style.transition = theme.transitions.create(
      'opacity',
      transitionProps
    );

    if (this.props.onEnter) {
      this.props.onEnter(node);
    }
  };

  handleExit = node => {
    const { theme } = this.props;
    const transitionProps = getTransitionProps(this.props, {
      mode: 'exit'
    });
    node.style.webkitTransition = theme.transitions.create(
      'opacity',
      transitionProps
    );
    node.style.transition = theme.transitions.create(
      'opacity',
      transitionProps
    );

    if (this.props.onExit) {
      this.props.onExit(node);
    }
  };

  render() {
    const {
      children,
      onEnter,
      onExit,
      style: styleProp,
      theme,
      ...other
    } = this.props;

    const style = {
      ...styleProp,
      ...(React.isValidElement(children) ? children.props.style : {})
    };

    return (
      <Transition
        appear
        onEnter={this.handleEnter}
        onExit={this.handleExit}
        {...other}
      >
        {(state, childProps) =>
          React.cloneElement(children, {
            style: {
              opacity: 0,
              willChange: 'opacity',
              ...styles[state],
              ...style
            },
            ...childProps
          })
        }
      </Transition>
    );
  }
}

Fade.propTypes = {
  /**
   * A single child content element.
   */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
   * If `true`, the component will transition in.
   */
  in: PropTypes.bool,
  /**
   * @ignore
   */
  onEnter: PropTypes.func,
  /**
   * @ignore
   */
  onExit: PropTypes.func,
  /**
   * @ignore
   */
  style: PropTypes.shape({}),
  /**
   * @ignore
   */
  theme: themePropType.isRequired,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number })
  ])
};

Fade.defaultProps = {
  children: null,
  in: false,
  onEnter: () => {},
  onExit: () => {},
  style: {},
  timeout: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen
  }
};

export default withTheme(Fade);
