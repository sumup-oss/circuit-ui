import styled, { css } from 'react-emotion';

const TooltipContainer = styled("div")`
  position: relative;
  line-height: 0;
  width: 32px;
  div {
    visibility: visible;
    opacity: 1;
  }
`;

export default TooltipContainer;