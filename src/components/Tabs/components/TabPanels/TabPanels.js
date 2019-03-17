import React from 'react';

/**
 * Tabpanel wrapping content being showed by tabs
 */
const TabPanels = ({ selectedIndex, children }) =>
  React.Children.map(children, (child, index) => {
    console.log(child, index, selectedIndex);

    if (index === selectedIndex) {
      return child;
    }

    return null;
  });

/**
 * @component
 */
export default TabPanels;
