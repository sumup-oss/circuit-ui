import { withProps } from 'recompose';
import styled from 'react-emotion';
import Text from '../Text';

const ListItemText = styled(
  withProps({
    noMargin: true
  })(Text)
)`
  label: list-item-text;
  padding-left: ${({ theme }) => theme.spacings.mega};
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default ListItemText;
