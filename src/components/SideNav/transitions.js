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

/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */

import warning from 'tiny-warning';

// Follow https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
// to learn the context in which each easing should be used.
const easing = {
  // This is the most common easing curve.
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
};

// Follow https://material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
// to learn when use what timing
const duration = {
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
      easing: easingOption = easing.easeInOut,
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
