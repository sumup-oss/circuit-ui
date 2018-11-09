import styled, { css } from 'react-emotion';

import Card from '../../../Card';
import { Wrapper as ItemWrapper } from '../Item';

const baseStyles = ({ theme }) => css`
  label: wrapper;

  margin: 0 0 ${theme.spacings.kilo} 0;
  padding: 0;
  > ${ItemWrapper} {
    border-bottom: ${theme.borderWidth.kilo} solid ${theme.colors.n300};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    &:last-child {
      border-bottom: none;
      border-bottom-left-radius: ${theme.borderRadius.mega};
      border-bottom-right-radius: ${theme.borderRadius.mega};
    }
  }
`;

/**
 * Component that wraps a list of List.Item components
 */
const Wrapper = styled(Card)(baseStyles);

Wrapper.defaultProps = Card.defaultProps;

/**
 * @component
 */
export default Wrapper;
