import React, { forwardRef } from 'react';

/**
 * Tabpanel wrapping content being showed by tabs
 */
const TabPanel = forwardRef((props, ref) => (
  <div ref={ref} {...props} role="tabpanel" tabIndex="0" />
));

/**
 * @component
 */
export default TabPanel;
