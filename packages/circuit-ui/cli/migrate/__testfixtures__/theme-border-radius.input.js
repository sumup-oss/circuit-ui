import { css } from '@emotion/core';
import styled from '@emotion/styled';

const elementStyles = ({ theme }) => css`
  border-top-left-radius: ${theme.borderRadius.mega};
  border-top-right-radius: ${theme.borderRadius.giga};
  border-bottom-left-radius: ${(p) => p.theme.borderRadius.tera};
  border-bottom-right-radius: ${(p) => p.theme.borderRadius.peta};
  border-radius: ${theme.borderRadius.kilo};
`;

const Element = styled.div(elementStyles);
