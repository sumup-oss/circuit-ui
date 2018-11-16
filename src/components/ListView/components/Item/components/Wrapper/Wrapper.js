import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { sizes } from '../../../../../../styles/constants';
import Hover from '../Hover';

const { KILO, MEGA, GIGA } = sizes;
const sizeMap = {
  [KILO]: 'kilo',
  [MEGA]: 'mega',
  [GIGA]: 'giga'
};

const baseStyles = ({ theme }) => css`
  label: wrapper__item;

  align-items: center;
  position: relative;
  cursor: pointer;
  border-bottom: ${theme.borderWidth.kilo} solid ${theme.colors.n300};

  &:hover,
  &:focus {
    outline: none;

    ${Hover} {
      display: block;
    }
  }

  &:first-child {
    border-top-left-radius: ${theme.borderRadius.mega};
    border-top-right-radius: ${theme.borderRadius.mega};
  }

  &:last-child {
    border-bottom-left-radius: ${theme.borderRadius.mega};
    border-bottom-right-radius: ${theme.borderRadius.mega};
  }
`;

const paddingStyles = ({ theme, padding }) => css`
  padding: ${theme.spacings[sizeMap[padding]]};
`;

const selectedStyles = ({ theme, selected }) =>
  selected &&
  css`
    label: wrapper__item--selected;

    background: ${theme.colors.p100};
  `;

const Wrapper = styled('div')(baseStyles, paddingStyles, selectedStyles);

Wrapper.propTypes = {
  /**
   * When true, shows the item with selected styles.
   */
  selected: PropTypes.bool,
  /**
   * Makes the item focusable to enable keyboard navigation. Careful!
   * Do NOT use positive numbers as this messes up the document's source order.
   */
  tabIndex: PropTypes.number,
  /**
   * Circuit UI spacing size.
   */
  padding: PropTypes.oneOf([Text.KILO, Text.MEGA, Text.GIGA])
};

Wrapper.defaultProps = {
  selected: false,
  padding: GIGA,
  tabIndex: 0
};

export default Wrapper;
