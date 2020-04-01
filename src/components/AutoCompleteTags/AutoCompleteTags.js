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

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { isEmpty, map, filter, difference } from 'lodash/fp';

import AutoCompleteInput from '../AutoCompleteInput';
import Tag from '../Tag';

const TagsWrapper = styled('div')(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: ${theme.spacings.kilo};
  `
);

const StyledTag = styled(Tag)(
  ({ theme }) => css`
    margin-top: ${theme.spacings.byte};
    &:first-of-type: {
      margin-top: 0;
    }
  `
);

const AutoCompleteTags = ({
  availableTags,
  selectedTags,
  onChange,
  ...inputProps
}) => {
  const [selected, setSelected] = useState(selectedTags);

  const handleAdd = tag => {
    const newSelected = [...selected, tag];
    setSelected(newSelected);
    onChange(newSelected);
  };

  const handleRemove = tag => {
    const newSelected = filter(option => option !== tag, selected);
    setSelected(newSelected);
    onChange(newSelected);
  };

  return (
    <Fragment>
      <AutoCompleteInput
        clearOnSelect
        onChange={handleAdd}
        options={difference(availableTags, selected)}
        {...inputProps}
      />
      {!isEmpty(selected) && (
        <TagsWrapper data-testid="autocomplete-tags-selected">
          {map(
            tag => (
              <StyledTag key={tag} onRemove={() => handleRemove(tag)}>
                {tag}
              </StyledTag>
            ),
            selected
          )}
        </TagsWrapper>
      )}
    </Fragment>
  );
};

AutoCompleteTags.propTypes = {
  /**
   * The available options to provided to the AutoCompleteInput.
   */
  availableTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * The initially selected options.
   */
  selectedTags: PropTypes.arrayOf(PropTypes.string),
  /**
   * Callback function used to handle adding and removing a tag.
   */
  onChange: PropTypes.func.isRequired
};

AutoCompleteTags.defaultProps = {
  selectedTags: []
};

/**
 * @component
 */
export default AutoCompleteTags;
