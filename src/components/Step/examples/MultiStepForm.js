/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* istanbul ignore file */

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Heading from '../../Heading';
import Button from '../../Button';
import ButtonGroup from '../../ButtonGroup';
import Input from '../../Input';
import Label from '../../Label';
import Select from '../../Select';
import ProgressBar from '../../ProgressBar';
import Step from '../Step';

const FormOne = ({ onNextClick }) => (
  <section>
    <Label htmlFor="first">First Name</Label>
    <Input placeholder="John" id="first" />
    <Label htmlFor="second">Second Name</Label>
    <Input placeholder="Doe" id="second" />
    <Button variant="primary" onClick={() => onNextClick()}>
      Next
    </Button>
  </section>
);
FormOne.propTypes = {
  onNextClick: PropTypes.func.isRequired
};

const FormTwo = ({ onNextClick, onBackClick }) => (
  <section>
    <Label htmlFor="street">Street</Label>
    <Input placeholder="Madison Ave 5" id="street" />
    <Label htmlFor="state">State</Label>
    <Select id="state">
      <option>CA</option>
      <option>TX</option>
      <option>NY</option>
    </Select>
    <Label htmlFor="postal">Postal Code</Label>
    <Input placeholder="10179" id="postal" />
    <ButtonGroup align={ButtonGroup.LEFT}>
      <Button variant="primary" onClick={() => onNextClick()}>
        Submit
      </Button>
      <Button onClick={() => onBackClick()}>Back</Button>
    </ButtonGroup>
  </section>
);
FormTwo.propTypes = {
  onNextClick: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired
};

const Thanks = () => (
  <section>
    <Heading>Thanks!</Heading>
  </section>
);

const containerStyles = css`
  margin: 0 auto;
  width: 90%;
  max-width: 300px;
`;
const Container = styled('div')(containerStyles);

const MultiStepForm = () => {
  const steps = [FormOne, FormTwo, Thanks];
  const totalSteps = steps.length;

  return (
    <Step total={steps.length}>
      {({ state, actions }) => {
        const StepComponent = steps[state.step];
        const stepNumber = state.step + 1;

        return (
          <Container>
            <Heading size="giga">
              Step {stepNumber} of {totalSteps}
            </Heading>
            <ProgressBar
              value={stepNumber}
              max={totalSteps}
              size={ProgressBar.KILO}
            />
            <StepComponent
              onNextClick={actions.next}
              onBackClick={actions.previous}
            />
          </Container>
        );
      }}
    </Step>
  );
};

export default MultiStepForm;
