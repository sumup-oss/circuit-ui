import { css } from '@emotion/core';
import styled from '@emotion/styled';

const pStyles = ({ theme }) => css`
  color: ${theme.colors.confirm};
  color: ${theme.colors.notify};
  color: ${theme.colors.alert};
`;

const Paragraph = styled.p(pStyles);
