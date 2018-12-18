/** @jsx jsx */

import { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';
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
