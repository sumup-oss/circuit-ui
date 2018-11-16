import React from 'react';
import PropTypes from 'prop-types';
import { flow } from 'lodash/fp';

import withKeyboardEvents from '../../../../util/withKeyboardEvents';
import { sizes } from '../../../../styles/constants';
import { Hover, Wrapper } from './components';
import withAriaSelected from '../../../../util/withAriaSelected';

const { KILO, MEGA, GIGA } = sizes;

const Item = ({ children, ...props }) => (
  <Wrapper {...props}>
    {children}
    <Hover />
  </Wrapper>
);

Item.KILO = KILO;
Item.MEGA = MEGA;
Item.GIGA = GIGA;

Item.propTypes = {
  /**
   * When true, shows the item with selected styles.
   */
  selected: PropTypes.bool,
  /**
   * A Circuit UI spacings size.
   */
  padding: PropTypes.oneOf([KILO, MEGA, GIGA]),
  /**
   * Makes the item focusable to enable keyboard navigation. Careful!
   * Do NOT use positive numbers as this messes up the document's source order.
   */
  tabIndex: PropTypes.number,
  /**
   * Content of the list item.
   */
  children: PropTypes.node.isRequired
};

Item.defaultProps = {
  padding: Item.GIGA,
  selected: false,
  tabIndex: 0
};

/**
 * @component
 */
export default flow(withKeyboardEvents, withAriaSelected)(Item);
