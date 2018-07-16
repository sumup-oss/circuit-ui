import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { parse } from 'react-docgen';

const StyledTable = styled('table')`
  color: #999;
  margin-top: 64px;
  border-collapse: collapse;
`;

const StyledTh = styled('th')`
  font-weight: 600;
  text-align: left;
  color: #000;

  font-size: 16px;
  padding: 16px;
  border: 1px solid #111111;
`;

const StyledTd = styled('td')`
  font-size: 16px;
  padding: 16px;
  border: 1px solid #999;
`;

const getRows = propTypes =>
  Object.keys(propTypes).map(prop => (
    <tr key={prop}>
      <StyledTd>{prop}</StyledTd>
      <StyledTd>{propTypes[prop].type.name}</StyledTd>
      <StyledTd>{propTypes[prop].required.toString()}</StyledTd>
      <StyledTd>{propTypes[prop].defaultValue.value.toString()}</StyledTd>
      <StyledTd>{propTypes[prop].description}</StyledTd>
    </tr>
  ));

const PropTable = ({ rawComponent }) => {
  const parsed = parse(rawComponent);
  const { props, description } = parsed;
  return (
    <div>
      {description}
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>Name</StyledTh>
            <StyledTh>Type</StyledTh>
            <StyledTh>Required?</StyledTh>
            <StyledTh>Default Value</StyledTh>
            <StyledTh>Description</StyledTh>
          </tr>
        </thead>
        <tbody>{getRows(props)}</tbody>
      </StyledTable>
    </div>
  );
};

export default PropTable;
