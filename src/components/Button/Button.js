import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import HtmlElement from '../HtmlElement';
import { sizes } from '../../styles/constants';
import { textMega } from '../../styles/style-helpers';
import Spinner from '../Spinner';

/**
 * Doing named imports of constants somehow makes react-docgen cry.
 * https://github.com/reactjs/react-docgen/issues/150
 */
const { KILO, MEGA, GIGA } = sizes;

const calculatePadding = ({ theme, size: buttonSize }) => (diff = '0px') => {
  const sizeMap = {
    [KILO]: `calc(${theme.spacings.bit} - ${diff}) calc(${
      theme.spacings.mega
    } - ${diff})`,
    [MEGA]: `calc(${theme.spacings.byte} - ${diff}) calc(${
      theme.spacings.giga
    } - ${diff})`,
    [GIGA]: `calc(${theme.spacings.kilo} - ${diff}) calc(${
      theme.spacings.tera
    } - ${diff})`
  };

  if (!sizeMap[buttonSize] && buttonSize) {
    return null;
  }

  return sizeMap[buttonSize] || sizeMap.mega;
};

const disabledStyles = css`
  label: button--disabled;
  opacity: 0.4;
  pointer-events: none;
`;

const stretchStyles = ({ stretch }) =>
  stretch &&
  css`
    label: button--stretched;
    width: 100%;
    display: block;
  `;

const baseStyles = ({ theme, href, ...otherProps }) => css`
  label: button;
  background-color: ${theme.colors.n100};
  border-color: ${theme.colors.n300};
  border-radius: ${theme.borderRadius.mega};
  border-style: solid;
  border-width: 1px;
  box-shadow: inset 0 1px 0 1px rgba(255, 255, 255, 0.06);
  display: ${href ? 'inline-block' : 'block'};
  color: ${theme.colors.n700};
  cursor: pointer;
  font-weight: ${theme.fontWeight.bold};
  width: auto;
  height: auto;
  text-decoration: none;
  ${textMega({ theme })};

  &:active {
    background-color: ${theme.colors.n300};
    border-color: ${theme.colors.n500};
    box-shadow: inset 0 4px 8px 0 rgba(12, 15, 20, 0.3);
  }

  &:focus {
    border-color: ${theme.colors.n500};
    border-width: 2px;
    outline: 0;
    padding: ${calculatePadding({ theme, ...otherProps })('1px')};
  }

  &:hover {
    background-color: ${theme.colors.n300};
  }

  &:hover,
  &:active {
    border-color: ${theme.colors.n500};
    border-width: 1px;
    padding: ${calculatePadding({ theme, ...otherProps })()};
  }

  &[disabled],
  &:disabled {
    ${disabledStyles};
  }
`;

const primaryStyles = ({ theme, primary }) =>
  primary &&
  css`
    label: button--primary;
    background-color: ${theme.colors.p500};
    border-color: ${theme.colors.p700};
    color: ${theme.colors.white};

    &:active {
      background-color: ${theme.colors.p700};
      border-color: ${theme.colors.p900};
    }

    &:focus {
      border-color: ${theme.colors.p700};
    }

    &:hover {
      background-color: ${theme.colors.p700};
    }

    &:hover,
    &:active {
      border-color: ${theme.colors.p900};
    }
  `;

const flatStyles = ({ theme, flat, secondary, ...otherProps }) =>
  flat &&
  !secondary &&
  css`
    label: button--flat;
    border-width: 0px;
    box-shadow: 0 0 0 1px rgba(12, 15, 20, 0.02),
      0 2px 2px 0 rgba(12, 15, 20, 0.06), 0 4px 4px 0 rgba(12, 15, 20, 0.06);

    &:active {
      background-color: ${theme.colors.p900};
      box-shadow: 0 0 0 1px rgba(12, 15, 20, 0.02),
        0 0 1px 0 rgba(12, 15, 20, 0.06), 0 2px 2px 0 rgba(12, 15, 20, 0.06);
    }

    &:active:focus,
    &:hover:focus {
      border-width: 0;
      padding: ${calculatePadding({ theme, flat, secondary, ...otherProps })()};
    }

    &:focus {
      border-width: 2px;
      padding: ${calculatePadding({ theme, flat, secondary, ...otherProps })(
        '2px'
      )};
    }
  `;

const secondaryStyles = ({ theme, secondary, flat, ...otherProps }) =>
  secondary &&
  css`
    label: button--secondary;
    background-color: transparent;
    border-color: ${theme.colors.n900};
    border-width: 0;
    box-shadow: none;
    color: ${theme.colors.n700};

    &:active {
      background-color: transparent;
      border-color: ${theme.colors.n900};
      border-width: 0;
      box-shadow: none;
    }

    &:focus {
      border-color: ${theme.colors.n900};
      border-width: 2px;
      box-shadow: none;
      padding: ${calculatePadding({ theme, flat, secondary, ...otherProps })(
        '2px'
      )};
    }

    &:hover {
      background-color: transparent;
      border-width: 0;
      border-color: ${theme.colors.n900};
    }

    &:active,
    &:hover,
    &:hover:focus,
    &:active:focus {
      padding: ${calculatePadding({ theme, flat, secondary, ...otherProps })()};
    }

    &:active,
    &:hover,
    &:focus {
      color: ${theme.colors.n900};
    }

    &:active:focus,
    &:hover:focus {
      border-color: ${theme.colors.n900};
      border-width: 2px;
      box-shadow: none;
      padding: ${calculatePadding({ theme, flat, secondary, ...otherProps })(
        '2px'
      )};
    }
  `;

const sizeStyles = props => {
  const { size: buttonSize } = props;
  const padding = calculatePadding(props)();
  return css({
    label: `button--${buttonSize}`,
    padding
  });
};

const buttonLoadingStyles = ({ isLoading }) =>
  isLoading &&
  css`
    label: button--loading;
    ${'' /* pointer-events: none; */};
  `;

const TextOrButtonElement = props => (
  <HtmlElement
    blacklist={{
      size: true,
      flat: true,
      primary: true,
      secondary: true,
      stretch: true,
      isLoading: true
    }}
    element={({ href }) => (href ? 'a' : 'button')}
    {...props}
  />
);

const ButtonElement = styled(TextOrButtonElement)`
  ${baseStyles};
  ${primaryStyles};
  ${sizeStyles};
  ${flatStyles};
  ${secondaryStyles};
  ${stretchStyles};
  ${buttonLoadingStyles};
`;

// TODO: use default animation after merging.
const loadingStyles = () => css`
  display: block;
  opacity: 0;
  position: absolute;
  fill: white;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);

  transition: opacity 200ms ease-in-out;
`;

const loadingShowingStyles = ({ showLoading }) =>
  showLoading &&
  css`
    opacity: 1;
  `;

const Loading = styled(Spinner)`
  ${loadingStyles};
  ${loadingShowingStyles};
`;

const ContentWrapper = styled('div')`
  position: relative;
`;

// TODO: use theme animations here.
const childrenWrapperStyles = () => css`
  opacity: 1;
  transition: opacity 200ms ease-in-out;
`;

const childrenWrapperLoadingStyles = ({ showLoading }) =>
  showLoading &&
  css`
    opacity: 0;
  `;

const ChildrenWrapper = styled('div')`
  ${childrenWrapperStyles};
  ${childrenWrapperLoadingStyles};
`;

/**
 * @component
 */
export default class Button extends Component {
  static KILO = KILO;
  static MEGA = MEGA;
  static GIGA = GIGA;
  static propTypes = {
    /**
     * URL the Button should lead to. Causes the Button to render an <a> tag.
     */
    href: PropTypes.string,
    /**
     * Should the Button be disabled?
     */
    disabled: PropTypes.bool,
    /**
     * Button has a 'flat' variation, triggered with this prop.
     */
    flat: PropTypes.bool,
    /**
     * Renders a secondary button. Secondary buttons look the same for
     * primary (default) and flat buttons.
     */
    secondary: PropTypes.bool,
    /**
     * Renders a primary button using the brand color.
     */
    primary: PropTypes.bool,
    /**
     * Link target. Should only be passed, if href is passed, too.
     */
    target: PropTypes.string,
    /**
     * Size of the button. Use the Button's KILO, MEGA, or GIGA properties.
     */
    size: PropTypes.oneOf([Button.KILO, Button.MEGA, Button.GIGA]),
    /**
     * Standard onClick function. If used on an anchor this can be used to
     * cause additional side-effects like tracking.
     */
    onClick: PropTypes.func,
    /**
     * Trigger stretch (full width) styles on the component.
     */
    stretch: PropTypes.bool,
    /**
     * Delay to wait before showing loading state.
     */
    delayMs: PropTypes.number,
    /**
     * Children nodes. Automatically wrapped in a div, so you can pass multiple
     * elements.
     */
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    disabled: false,
    flat: false,
    size: MEGA,
    target: null,
    href: null,
    onClick: null,
    primary: false,
    secondary: false,
    stretch: false,
    delayMs: 500
  };

  state = {
    showLoading: false,
    timeoutId: null
  };

  componentWillUnmount() {
    const { timeoutId } = this.state;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  handleClick = e => {
    const { onClick, delayMs } = this.props;
    const { timeoutId: existingTimeoutId } = this.state;

    if (existingTimeoutId) {
      return null;
    }

    const timeoutId = setTimeout(() => {
      this.setState({ showLoading: true });
    }, delayMs);
    this.setState({ timeoutId });

    const handlingClick = onClick(e);

    if (!handlingClick || !handlingClick.then) {
      clearTimeout(timeoutId);
      this.setState({ timeoutId: null });
      return null;
    }

    return handlingClick.finally(() => {
      this.setState({ showLoading: false, timeoutId: null });
      clearTimeout(timeoutId);
    });
  };

  render() {
    const {
      children,
      delayMs,
      onClick: outerOnClick,
      size,
      ...rest
    } = this.props;
    const { showLoading } = this.state;
    const onClick = outerOnClick ? this.handleClick : outerOnClick;

    return (
      <ButtonElement {...{ ...rest, onClick, size }}>
        <ContentWrapper>
          {showLoading && <Loading {...{ showLoading, size }} />}
          <ChildrenWrapper {...{ showLoading }}>{children}</ChildrenWrapper>
        </ContentWrapper>
      </ButtonElement>
    );
  }
}
