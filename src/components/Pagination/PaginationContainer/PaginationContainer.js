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

const NavigationButton = styled(Button)`
  ${({ theme }) => `
    margin: ${theme.spacings.giga};
  `};
`;

NavigationButton.displayName = 'NavigationButton';

const PaginationContainer = ({
  children,
  page,
  totalPages,
  onChange,
  nextLabel,
  previousLabel
}) => (
  <Container>
    {page !== 1 && (
      <NavigationButton
        size={Button.MEGA}
        plain
        onClick={() => onChange(page - 1)}
      >
        {previousLabel}
      </NavigationButton>
    )}
    {children}
    {page !== totalPages && (
      <NavigationButton
        size={Button.MEGA}
        plain
        onClick={() => onChange(page + 1)}
      >
        {nextLabel}
      </NavigationButton>
    )}
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
