/* eslint-disable */
import React from 'react';
import styled from 'react-emotion';
import { parse } from 'react-docgen';
import Table from '../../src/components/Table';
import { standard } from '../../src/themes/index';
import { ThemeProvider } from 'emotion-theming';

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

const getRows = props => Object.keys(props).map(prop => [
  prop,
  props[prop].type.name,
  props[prop].required.toString(),
  props[prop].defaultValue.value.toString(),
  props[prop].description
]);

const PropTable = ({ component }) => {
  const parsed = component.__docgenInfo;
  let { props, description } = parsed;
  return (
    <div style={{ overflow: 'scroll', border: '1px solid lightgray' }}>
      <ThemeProvider theme={standard}>
        <Table
          headers={['Name', 'Type', 'Required', 'Default Value', 'Description']}
          rows={getRows(props)}
        />
      </ThemeProvider>
    </div>
  );
};


export default PropTable;
