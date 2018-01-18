import React, { Children } from 'react';
import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';

const App = ({ children }) => Children.only(children);

const styleDecorator = storyFn => <App>{storyFn()}</App>;

addDecorator(styleDecorator);
addDecorator(withSmartKnobs);
addDecorator(withKnobs);
