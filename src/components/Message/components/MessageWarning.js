import styled from '@emotion/styled';

import MessageSuccess from '../message-success.svg';

const MessageWarning = styled(MessageSuccess)`
  ${({ theme }) => `
    rect {
      fill: ${theme.colors.y500};
    }
  `};
`;

export default MessageWarning;
