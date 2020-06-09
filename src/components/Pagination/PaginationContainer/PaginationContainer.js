/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Button from '../../Button';

const Container = styled('div')`
  ${({ theme }) => `
    display: flex;
    align-items: center;
    width: 100%;
    padding: ${theme.spacings.kilo};
  `};
`;

const NavigationButtonPrevious = styled(Button)`
  ${({ theme }) => `
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0;
    &:hover {
      box-shadow: 1px 0 0 ${theme.colors.n500};
      z-index: 1;
    }
`};
`;

const NavigationButtonNext = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

const PaginationFooter = styled('div')`
  ${({ theme }) => `
    text-align: right;
    color: ${theme.colors.n500};
    font-size: ${theme.typography.text.kilo.fontSize};
    padding-right: ${theme.spacings.kilo};
  `};
`;

const PaginationContainer = ({
  children,
  page,
  totalPages,
  onChange,
  nextLabel,
  nextLabelTracking = {},
  previousLabel,
  previousLabelTracking = {},
  footer,
  ...rest
}) => (
  <Fragment>
    <Container {...rest}>
      <NavigationButtonPrevious
        size="kilo"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        data-testid="pagination-button-previous"
        tracking={{
          label: previousLabelTracking.label,
          component:
            previousLabelTracking.component || 'pagination-previous-button',
          customParameters: previousLabelTracking.customParameters
        }}
      >
        {previousLabel}
      </NavigationButtonPrevious>
      {children}
      <NavigationButtonNext
        size="kilo"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        isLast
        isFirst={false}
        data-testid="pagination-button-next"
        tracking={{
          label: nextLabelTracking.label,
          component: nextLabelTracking.component || 'pagination-next-button',
          customParameters: nextLabelTracking.customParameters
        }}
      >
        {nextLabel}
      </NavigationButtonNext>
    </Container>
    {footer && <PaginationFooter>{footer}</PaginationFooter>}
  </Fragment>
);

PaginationContainer.propTypes = {
  children: PropTypes.node.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  nextLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  nextLabelTracking: PropTypes.shape({
    label: PropTypes.string.isRequired,
    component: PropTypes.string,
    customParameters: PropTypes.object
  }),
  previousLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  previousLabelTracking: PropTypes.shape({
    label: PropTypes.string.isRequired,
    component: PropTypes.string,
    customParameters: PropTypes.object
  }),
  footer: PropTypes.string
};

PaginationContainer.defaultProps = {
  footer: null
};

export default PaginationContainer;
