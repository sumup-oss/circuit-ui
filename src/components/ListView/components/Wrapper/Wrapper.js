import styled from '@emotion/styled';

import Card from '../../../Card';

/**
 * Component that wraps a list of List.Item components
 */
const Wrapper = styled(Card)`
  label: wrapper;

  padding: 0;
`;

Wrapper.defaultProps = Card.defaultProps;
Wrapper.displayName = 'List';

/**
 * @component
 */
export default Wrapper;
