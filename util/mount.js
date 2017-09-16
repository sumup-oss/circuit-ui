import React from 'react';
import { mount as enzymeMount } from 'enzyme';
import StyleProvider from './StyleProvider';

export default function mount(element) {
  const insertCss = (...styles) => styles.forEach(s => s._insertCss());
  return enzymeMount(
    <StyleProvider insertCss={insertCss}>
      {element}
    </StyleProvider>
  );
}
