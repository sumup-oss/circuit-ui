import { css } from '@emotion/core';
import styled from '@emotion/styled';

const pStyles = ({ theme }) => css`
  color: ${theme.colors.success};
  color: ${theme.colors.warning};
  color: ${theme.colors.danger};
`;

const Paragraph = styled.p(pStyles);
