import styled from '@emotion/styled';
import { css } from '@emotion/core';

const borderRadiusStyles = ({ theme }) => css`
  border-top-left-radius: ${theme.borderRadius.mega};
  border-top-right-radius: ${theme.borderRadius.giga};
  border-bottom-left-radius: ${theme.borderRadius.tera};
  border-bottom-right-radius: ${theme.borderRadius.peta};
`;

const removedRadiusStyles = ({ theme }) => css`
  border-radius: ${theme.borderRadius.kilo};
`;

const BorderRadius = styled.div(borderRadiusStyles);

const RemovedRadius = styled.div(removedRadiusStyles);
