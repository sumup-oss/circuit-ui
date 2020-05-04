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
import PageButton from '../PageButton';

const PaginationButton = ({ currentPage, onClick, active, ...props }) => (
  <PageButton
    {...props}
    variant={active ? 'primary' : 'secondary'}
    name={currentPage}
    onClick={() => onClick(currentPage)}
  >
    {currentPage}
  </PageButton>
);

PaginationButton.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool
};

PaginationButton.defaultProps = {
  active: false
};

export default PaginationButton;
