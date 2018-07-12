import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { standard } from '../../src/themes';

export const Wrapper = (props) => {
  return (
    <div className="yolo">{props.children}</div>
      );
      }
