import React from 'react';
import PropTypes from 'prop-types';

import { Hover, Wrapper } from './components';
import { sizes } from '../../../../styles/constants';

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
   * When true, shows the item with selected styles
   */
  selected: PropTypes.bool,
  /**
   * A Circuit UI spacings size.
   */
  padding: PropTypes.oneOf([KILO, MEGA, GIGA]),
  /**
   * Content of the list item.
   */
  children: PropTypes.node.isRequired
};

Item.defaultProps = {
  padding: Item.GIGA,
  selected: false
};

/**
 * @component
 */
export default Item;
