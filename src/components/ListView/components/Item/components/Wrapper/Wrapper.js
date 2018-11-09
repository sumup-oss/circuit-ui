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
  border-radius: ${theme.borderRadius.mega};
  position: relative;
  cursor: pointer;
  &:hover {
    ${Hover} {
      display: block;
    }
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
   * When true, shows the item with selected styles
   */
  selected: PropTypes.bool,
  /**
   * Circuit UI spacing size.
   */
  padding: PropTypes.oneOf([Text.KILO, Text.MEGA, Text.GIGA])
};

Wrapper.defaultProps = {
  selected: false,
  padding: GIGA
};

export default Wrapper;
