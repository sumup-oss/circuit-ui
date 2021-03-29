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

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Heading from '../../Heading';
import Button from '../../Button';
import ButtonGroup from '../../ButtonGroup';
import Input from '../../Input';
import Select from '../../Select';
import ProgressBar from '../../ProgressBar';
import Step from '../Step';

const FormOne = ({ onNextClick }) => (
  <section>
    <Input label="First Name" placeholder="John" />
    <Input label="Second Name" placeholder="Doe" />
    <Button variant="primary" onClick={() => onNextClick()}>
      Next
    </Button>
  </section>
);
FormOne.propTypes = {
  onNextClick: PropTypes.func.isRequired,
};

const FormTwo = ({ onNextClick, onBackClick }) => (
  <section>
    <Input label="Street" placeholder="Madison Ave 5" />
    <Select label="State">
      <option>CA</option>
      <option>TX</option>
      <option>NY</option>
    </Select>
    <Input label="Postal Code" placeholder="10179" />
    <ButtonGroup align="left">
      <Button variant="primary" onClick={() => onNextClick()}>
        Submit
      </Button>
      <Button onClick={() => onBackClick()}>Back</Button>
    </ButtonGroup>
  </section>
);
FormTwo.propTypes = {
  onNextClick: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
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
              size={'kilo'}
              css={(theme) =>
                css`
                  margin-bottom: ${theme.spacings.mega};
                `
              }
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
