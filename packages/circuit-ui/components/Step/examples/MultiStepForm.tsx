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

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Headline from '../../Headline';
import Button from '../../Button';
import ButtonGroup from '../../ButtonGroup';
import Input from '../../Input';
import Select from '../../Select';
import ProgressBar from '../../ProgressBar';
import Step from '../Step';
import { spacing } from '../../../styles/style-mixins';

interface FormProps {
  onNextClick: () => void;
  onBackClick: () => void;
}

const FormOne = ({ onNextClick }: FormProps) => (
  <section>
    <Input
      label="First Name"
      placeholder="John"
      css={spacing({ bottom: 'mega' })}
      noMargin
    />
    <Input
      label="Second Name"
      placeholder="Doe"
      css={spacing({ bottom: 'mega' })}
      noMargin
    />
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
      css={spacing({ bottom: 'mega' })}
      noMargin
    />
    <Select label="State" css={spacing({ bottom: 'mega' })} noMargin>
      <option>CA</option>
      <option>TX</option>
      <option>NY</option>
    </Select>
    <Input
      label="Postal Code"
      placeholder="10179"
      css={spacing({ bottom: 'mega' })}
      noMargin
    />
    <ButtonGroup align="left">
      <Button variant="primary" onClick={() => onNextClick()}>
        Submit
      </Button>
      <Button onClick={() => onBackClick()}>Back</Button>
    </ButtonGroup>
  </section>
);

const Thanks = () => (
  <section>
    <Headline as="h3" noMargin>
      Thanks!
    </Headline>
  </section>
);

const containerStyles = css`
  margin: 0 auto;
  width: 90%;
  max-width: 300px;
`;
const Container = styled('div')(containerStyles);

export default function MultiStepForm(): JSX.Element {
  const steps = [FormOne, FormTwo, Thanks];
  const totalSteps = steps.length;

  return (
    <Step totalSteps={steps.length}>
      {({ state, actions }) => {
        const StepComponent = steps[state.step];
        const stepNumber = state.step + 1;

        return (
          <Container>
            <Headline
              as="h2"
              size="three"
              noMargin
              css={spacing({ bottom: 'giga' })}
            >
              Step {stepNumber} of {totalSteps}
            </Headline>
            <ProgressBar
              value={stepNumber}
              max={totalSteps}
              size={'kilo'}
              css={spacing({ bottom: 'mega' })}
              label={`Step ${stepNumber} of ${totalSteps}`}
              hideLabel
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
}
