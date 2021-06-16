import styled from '@emotion/styled';
import { css } from '@emotion/core';

const elementStyles = ({ theme }) => css`
  border-top-left-radius: ${theme.borderRadius.mega};
  border-top-right-radius: ${theme.borderRadius.giga};
  border-bottom-left-radius: ${theme.borderRadius.tera};
  border-bottom-right-radius: ${theme.borderRadius.peta};
  border-radius: ${theme.borderRadius.kilo};
`;

const Element = styled.div(elementStyles);
