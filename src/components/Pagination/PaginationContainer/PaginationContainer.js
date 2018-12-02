import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Button from '../../Button';

const Container = styled('div')`
  ${({ theme }) => `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: ${theme.spacings.kilo};
  `};
`;

Container.displayName = 'Container';

const NavigationButtonPrevious = styled(Button)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 0;
`;
NavigationButtonPrevious.displayName = 'NavigationButtonPrevious';

const NavigationButtonNext = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

NavigationButtonNext.displayName = 'NavigationButtonNext';

const PaginationContainer = ({
  children,
  page,
  totalPages,
  onChange,
  nextLabel,
  previousLabel
}) => (
  <Container>
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
);

PaginationContainer.displayName = 'PaginationContainer';

PaginationContainer.propTypes = {
  children: PropTypes.node.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  nextLabel: PropTypes.string.isRequired,
  previousLabel: PropTypes.string.isRequired
};

export default PaginationContainer;
