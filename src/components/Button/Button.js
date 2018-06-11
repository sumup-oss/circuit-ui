import React from 'react';
import { pick } from 'lodash/fp';

import { sizes } from '../../styles/constants';

import PlainButton from './components/PlainButton';
import RegularButton from './components/RegularButton';
import {
  BUTTON_PROP_TYPES,
  BUTTON_DEFAULT_PROPS,
  PLAIN_BUTTON_PROPS,
  BUTTON_PROPS
} from './constants';

const { KILO, MEGA, GIGA } = sizes;

/**
 * A button component with support for the anchor and button
 * element as well as a button-looking button and a text link.
 */
const Button = ({ plain, ...props }) =>
  plain ? (
    <PlainButton {...pick(PLAIN_BUTTON_PROPS, props)} />
  ) : (
    <RegularButton {...pick(BUTTON_PROPS, props)} />
  );

Button.propTypes = BUTTON_PROP_TYPES;
Button.defaultProps = BUTTON_DEFAULT_PROPS;
Button.KILO = KILO;
Button.MEGA = MEGA;
Button.GIGA = GIGA;

/**
 * @component
 */
export default Button;
