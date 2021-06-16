import styled from '@emotion/styled';
import { css } from '@emotion/core';

const elementStyles = ({ theme }) => css`
  border-top-left-radius: ${theme.borderRadius.bit};
  border-top-right-radius: ${theme.borderRadius.byte};
  border-bottom-left-radius: ${theme.borderRadius.byte};
  border-bottom-right-radius: ${theme.borderRadius.kilo};
  border-radius: ${'1px'};
`;

const Element = styled.div(elementStyles);
