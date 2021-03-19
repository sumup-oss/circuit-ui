import styled from '@emotion/styled';
import { css } from '@emotion/core';

const iconStyles = ({ theme }) => css`
  width: ${theme.iconSizes.byte};
`;

const Icon = styled.div(iconStyles);
