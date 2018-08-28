import React from 'react';
import { Playground } from 'docz'; // eslint-disable-line import/no-extraneous-dependencies
import { Wrapper } from './Wrapper';

const CircuitPlayground = props => <Playground wrapper={Wrapper} {...props} />;

export default CircuitPlayground;
