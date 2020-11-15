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

import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  label: functional-component__wrapper;
  padding: 8px;
`;

const Input = styled.input`
  label: functional-component;
  border: 1px solid blue;
`;

const Label = styled.label`
  label: functional-component__label;
  margin-bottom: 4px;
  color: gray;
`;

interface FunctionalComponentProps {
  label: string;
  value: string;
}

export function FunctionalComponent({
  label,
  value,
}: FunctionalComponentProps) {
  const id = 'id';
  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} value={value} />
    </Wrapper>
  );
}
