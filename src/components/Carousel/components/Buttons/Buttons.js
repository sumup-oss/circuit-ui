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
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { ChevronLeft, ChevronRight, Cross, Check } from '@sumup/icons';

import CircuitUIButton from '../../../Button';

const buttonListStyles = css`
  label: carousel__buttonlist;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ButtonList = styled('div')(buttonListStyles);

const baseButtonStyles = ({ theme }) => css`
  label: carousel__button;
  background-color: ${theme.colors.n300};
  width: ${theme.iconSizes.giga};
  height: ${theme.iconSizes.giga};
  padding: 0;
  overflow: hidden;
  border-radius: 50%;

  margin-left: ${theme.spacings.byte};

  &:first-of-type {
    margin-left: 0;
  }
  &:active,
  &:focus,
  &:hover {
    padding: 0;
  }

  ${theme.mq.untilKilo} {
    width: ${theme.iconSizes.mega};
    height: ${theme.iconSizes.mega};

    svg {
      width: 25%;
    }
  }
`;
export const Button = styled(CircuitUIButton)(baseButtonStyles);

// wrapping button content due to flex bug in Safari 10.1
// via https://github.com/philipwalton/flexbugs/issues/236
const innerWrapperStyles = css`
  label: carousel__button--innerwrapper;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InnerWrapper = styled('div')(innerWrapperStyles);

export const NextButton = props => (
  <Button aria-label="next" {...props}>
    <InnerWrapper>
      <ChevronRight />
    </InnerWrapper>
  </Button>
);

export const PrevButton = props => (
  <Button aria-label="previous" {...props}>
    <InnerWrapper>
      <ChevronLeft />
    </InnerWrapper>
  </Button>
);

export const PlayButton = ({ paused, ...props }) => (
  <Button aria-label={paused ? 'play' : 'pause'} {...props}>
    <InnerWrapper>{paused ? <Check /> : <Cross />}</InnerWrapper>
  </Button>
);

PlayButton.propTypes = {
  paused: PropTypes.bool
};
