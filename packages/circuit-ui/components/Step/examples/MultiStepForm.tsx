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

'use client';

import { Headline } from '../../Headline/index';
import { Button } from '../../Button/index';
import { ButtonGroup } from '../../ButtonGroup/index';
import { Input } from '../../Input/index';
import { Select } from '../../Select/index';
import { ProgressBar } from '../../ProgressBar/index';
import { Step } from '../Step';

import classes from './MultiStepForm.module.css';

interface FormProps {
  onNextClick: () => void;
  onBackClick: () => void;
}

const FormOne = ({ onNextClick }: FormProps) => (
  <section>
    <Input label="First Name" placeholder="John" className={classes.spacing} />
    <Input label="Second Name" placeholder="Doe" className={classes.spacing} />
    <Button variant="primary" onClick={() => onNextClick()}>
      Next
    </Button>
  </section>
);

const FormTwo = ({ onNextClick, onBackClick }: FormProps) => (
  <section>
    <Input
      label="Street"
      placeholder="Madison Ave 5"
      className={classes.spacing}
    />
    <Select label="State" className={classes.spacing}>
      <option>CA</option>
      <option>TX</option>
      <option>NY</option>
    </Select>
    <Input
      label="Postal Code"
      placeholder="10179"
      className={classes.spacing}
    />
    <ButtonGroup
      align="left"
      actions={{
        primary: {
          children: 'Submit',
          onClick: () => onNextClick(),
        },
        secondary: {
          children: 'Back',
          onClick: () => onBackClick(),
        },
      }}
    />
  </section>
);

const Thanks = () => (
  <section>
    <Headline as="h3">Thanks!</Headline>
  </section>
);

export function MultiStepForm() {
  const steps = [FormOne, FormTwo, Thanks];
  const totalSteps = steps.length;

  return (
    <Step totalSteps={steps.length}>
      {({ state, actions }) => {
        const StepComponent = steps[state.step];
        const stepNumber = state.step + 1;

        return (
          <div className={classes.container}>
            <Headline as="h2" size="m" className={classes.spacing}>
              Step {stepNumber} of {totalSteps}
            </Headline>
            <ProgressBar
              value={stepNumber}
              max={totalSteps}
              size="m"
              className={classes.spacing}
              label={`Step ${stepNumber} of ${totalSteps}`}
              hideLabel
            />
            <StepComponent
              onNextClick={actions.next}
              onBackClick={actions.previous}
            />
          </div>
        );
      }}
    </Step>
  );
}
