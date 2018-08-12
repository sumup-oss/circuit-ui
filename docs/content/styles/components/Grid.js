import styled, { css } from 'react-emotion';
import OriginalRow from '../../../../src/components/Row';
import OriginalGrid from '../../../../src/components/Grid';
import OriginalCol from '../../../../src/components/Col';

const Grid = styled(OriginalGrid)`
  ${({ theme }) => css`
    background-color: ${theme.colors.n100};
  `};
`;

const Col = styled(OriginalCol)`
  ${({ theme }) => css`
    &:nth-of-type(n) {
      background-color: ${theme.colors.b500};
    }

    &:nth-of-type(2n) {
      background-color: ${theme.colors.b300};
    }
    color: ${theme.colors.white};
    text-align: center;
  `};
`;

const Row = styled(OriginalRow)`
  ${({ theme }) => css`
    color: ${theme.colors.white};
  `};
`;

export { Grid, Col, Row };
