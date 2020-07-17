import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Col } from '@sumup/circuit-ui';

function fakeGrid(theme) {
  const gridStyles = theme.grid.tera;
}

const App = ({ children }) => (
  <Col
    span={{
      default: 0,
      kilo: 3,
      tera: 6,
    }}
    skip={{
      default: 0,
      kilo: 3,
      tera: 6,
    }}
  >
    {children}
  </Col>
);
