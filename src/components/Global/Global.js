import React from 'react';
import PropTypes from 'prop-types';
import { Global as EmotionGlobal, css } from '@emotion/core';

import { createGlobalStyles } from './GlobalService';

const Global = ({ custom }) => (
  <EmotionGlobal styles={theme => css(createGlobalStyles(theme, custom))} />
);

Global.propTypes = {
  custom: PropTypes.string
};

Global.defaultProps = {
  custom: ''
};

export default Global;
