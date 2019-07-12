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

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoadingButton from '../../../src/components/LoadingButton';

export const LoadingButtonWithState = ({ exitAnimation, children }) => {
  // get loading button status animation or set as default
  const variation = exitAnimation || 'DEFAULT';

  const [loading, setLoading] = useState({
    DEFAULT: false,
    SUCCESS: false,
    ERROR: false
  });

  const handleClick = () => {
    // trigger loading state
    setLoading({
      ...loading,
      [variation]: true
    });
    // reset loading
    window.setTimeout(() => {
      setLoading({
        ...loading,
        [variation]: false
      });
    }, 1000);
  };

  return (
    <LoadingButton
      primary
      isLoading={loading[variation]}
      onClick={() => handleClick()}
      exitAnimation={exitAnimation && LoadingButton[exitAnimation]}
    >
      {children}
    </LoadingButton>
  );
};

LoadingButtonWithState.propTypes = {
  exitAnimation: PropTypes.oneOf(['SUCCESS', 'ERROR']),
  children: PropTypes.string
};
