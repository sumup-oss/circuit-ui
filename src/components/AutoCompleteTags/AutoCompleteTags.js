import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import styled /* , { css } */ from 'react-emotion';
import { remove } from 'lodash/fp';

import AutoComplete from '../AutoComplete';
import Tag from '../Tag';

const TagsWrapper = styled('div')`
  margin-top: ${props => props.theme.spacings.kilo};

  span {
    display: inline-block;
    margin-bottom: ${props => props.theme.spacings.byte};
  }
`;

class AutoCompleteTags extends Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    availableTags: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  state = { tags: [] };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tags.length !== this.state.tags) {
      this.props.handleChange(this.state.tags);
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
      item => !tags.includes(item)
    );

    return (
      <Fragment>
        <AutoComplete
          handleChange={this.handleAddTag}
          items={autoCompleteItems}
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
