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
import LoadingButton from '../../../src/components/LoadingButton';

export const LoadingButtonWithState = () => {
  const [loading, setLoading] = useState(false);
  const [loadingSuccess, setLoadingSuccess] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const handleClick = status => {
    // trigger loading state
    if (status === 'success') {
      setLoadingSuccess(true);
      window.setTimeout(() => {
        setLoadingSuccess(false);
      }, 1000);
    } else if (status === 'error') {
      setLoadingError(true);
      window.setTimeout(() => {
        setLoadingError(false);
      }, 1000);
    } else {
      setLoading(true);
      window.setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      <LoadingButton primary isLoading={loading} onClick={() => handleClick()}>
        Load
      </LoadingButton>
      <br />
      <LoadingButton
        primary
        isLoading={loadingError}
        onClick={() => handleClick('error')}
        exitAnimation={LoadingButton.ERROR}
      >
        Load with error
      </LoadingButton>
      <br />
      <LoadingButton
        primary
        isLoading={loadingSuccess}
        onClick={() => handleClick('success')}
        exitAnimation={LoadingButton.SUCCESS}
      >
        Load with success
      </LoadingButton>
    </>
  );
};
