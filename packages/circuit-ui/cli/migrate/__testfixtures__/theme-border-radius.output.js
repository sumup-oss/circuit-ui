import { css } from '@emotion/core';
import styled from '@emotion/styled';

const elementStyles = ({ theme }) => css`
  border-top-left-radius: ${theme.borderRadius.bit};
  border-top-right-radius: ${theme.borderRadius.byte};
  border-bottom-left-radius: ${(p) => p.theme.borderRadius.byte};
  border-bottom-right-radius: ${(p) => p.theme.borderRadius.kilo};
  border-radius: ${'1px'};
`;

const Element = styled.div(elementStyles);
