import React from 'react';

import Global from './GlobalStyles';

import { createGlobalStyles } from './GlobalStylesService';

jest.mock('./GlobalStylesService', () => ({
  createGlobalStyles: jest.fn()
}));

const renderComponent = (props = {}) => shallow(<Global {...props} />);

describe('Global', () => {
  it('should create the global stylesheet', () => {
    renderComponent();
    expect(createGlobalStyles).toHaveBeenCalled();
  });
});
