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

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { remove, includes } from 'lodash/fp';

import AutoCompleteInput from '../AutoCompleteInput';
import Tag from '../Tag';

const TagsWrapper = styled('div')`
  margin-top: ${props => props.theme.spacings.kilo};
  /* this *hack* is to not allow the tags to be visible bellow the overlay */
  padding: 0 1px 0 1px;

  span {
    display: inline-block;
    margin-bottom: ${props => props.theme.spacings.byte};
  }
`;

class AutoCompleteTags extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    availableTags: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  state = { tags: [] };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tags.length !== this.state.tags.length) {
      this.props.onChange(this.state.tags);
    }
  }

  handleAddTag = item =>
    this.setState(({ tags }) => ({ tags: [...tags, item] }));

  handleRemoveTag = newTag =>
    this.setState(({ tags }) => ({
      tags: remove(tag => tag === newTag)(tags)
    }));

  render() {
    const { availableTags } = this.props;
    const { tags } = this.state;
    const autoCompleteItems = availableTags.filter(
      item => !includes(item, tags)
    );

    return (
      <Fragment>
        <AutoCompleteInput
          onChange={this.handleAddTag}
          items={autoCompleteItems}
          clearOnSelect
        />
        {!!tags.length && (
          <TagsWrapper>
            {tags.map(tag => (
              <Tag key={tag} onRemove={() => this.handleRemoveTag(tag)}>
                {tag}
              </Tag>
            ))}
          </TagsWrapper>
        )}
      </Fragment>
    );
  }
}

/**
 * @component
 */
export default AutoCompleteTags;
