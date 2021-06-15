import styled from '@emotion/styled';
import { css } from '@emotion/core';

const borderRadiusStyles = ({ theme }) => css`
  border-top-left-radius: ${theme.borderRadius.bit};
  border-top-right-radius: ${theme.borderRadius.byte};
  border-bottom-left-radius: ${theme.borderRadius.byte};
  border-bottom-right-radius: ${theme.borderRadius.kilo};
`;

const removedRadiusStyles = ({ theme }) => css`
  border-radius: ${theme.borderRadius.none};
`;

const BorderRadius = styled.div(borderRadiusStyles);

const RemovedRadius = styled.div(removedRadiusStyles);
