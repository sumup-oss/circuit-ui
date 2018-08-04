/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */

import warning from 'warning';

export const easing = {
  default: `200ms ease-in-out`
};

// Follow https://material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
// to learn when use what timing
export const duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};

export const formatMs = milliseconds => `${Math.round(milliseconds)}ms`;
export const isString = value => typeof value === 'string';
export const isNumber = value => !isNaN(parseFloat(value));

export const reflow = node => node.scrollTop;

export function getTransitionProps(props, options) {
  const { timeout, style = {} } = props;

  return {
    duration:
      style.transitionDuration || typeof timeout === 'number'
        ? timeout
        : timeout[options.mode],
    delay: style.transitionDelay
  };
}

/**
 * @param {string|Array} props
 * @param {object} param
 * @param {string} param.prop
 * @param {number} param.duration
 * @param {string} param.easing
 * @param {number} param.delay
 */
export default {
  easing,
  duration,
  create(props = ['all'], options = {}) {
    const {
      duration: durationOption = duration.standard,
      easing: easingOption = easing.default,
      delay = 0,
      ...other
    } = options;
    warning(
      isString(props) || Array.isArray(props),
      'Circuit-UI: argument "props" must be a string or Array.'
    );
    warning(
      isNumber(durationOption) || isString(durationOption),
      `Circuit-UI: argument "duration"
      must be a number or a string but found ${durationOption}.`
    );
    warning(
      isString(easingOption),
      'Circuit-UI: argument "easing" must be a string.'
    );
    warning(
      isNumber(delay) || isString(delay),
      'Circuit-UI: argument "delay" must be a number or a string.'
    );
    warning(
      Object.keys(other).length === 0,
      `Circuit-UI: unrecognized argument(s) [${Object.keys(other).join(',')}]`
    );
    return (Array.isArray(props) ? props : [props])
      .map(
        animatedProp =>
          `${animatedProp} ${
            typeof durationOption === 'string'
              ? durationOption
              : formatMs(durationOption)
          } ${easingOption} ${
            typeof delay === 'string' ? delay : formatMs(delay)
          }`
      )
      .join(',');
  },
  getAutoHeightDuration(height) {
    if (!height) {
      return 0;
    }
    const constant = height / 36;
    // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10
    return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
  }
};
