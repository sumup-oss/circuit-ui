import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Button from '../../Button';

const Container = styled('div')`
  ${({ theme, align, justify }) => `
    display: flex;
    align-items: ${align};
    justify-content: ${justify};
    width: 100%;
    padding: ${theme.spacings.kilo};
  `};
`;

Container.displayName = 'Container';

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
NavigationButtonPrevious.displayName = 'NavigationButtonPrevious';

const NavigationButtonNext = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;
NavigationButtonNext.displayName = 'NavigationButtonNext';

const PaginationFooter = styled('div')`
  ${({ theme }) => `
    text-align: right;
    color: ${theme.colors.n500};
    font-size: ${theme.typography.text.kilo.fontSize};
    padding-right: 12px;
  `};
`;

const PaginationContainer = ({
  children,
  page,
  totalPages,
  onChange,
  nextLabel,
  previousLabel,
  footer,
  align,
  justify
}) => (
  <Fragment>
    <Container align={align} justify={justify}>
      <NavigationButtonPrevious
        size={Button.KILO}
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
      >
        {previousLabel}
      </NavigationButtonPrevious>
      {children}
      <NavigationButtonNext
        size={Button.KILO}
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        isLast
        isFirst={false}
      >
        {nextLabel}
      </NavigationButtonNext>
    </Container>
    {footer && <PaginationFooter>{footer}</PaginationFooter>}
  </Fragment>
);

PaginationContainer.displayName = 'PaginationContainer';

PaginationContainer.propTypes = {
  children: PropTypes.node.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  nextLabel: PropTypes.string.isRequired,
  previousLabel: PropTypes.string.isRequired,
  footer: PropTypes.string,
  align: PropTypes.string,
  justify: PropTypes.string
};

PaginationContainer.defaultProps = {
  footer: null,
  align: 'center',
  justify: 'center'
};

export default PaginationContainer;
