import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { size } from 'polished';

import { standard } from '../../themes';

import StandardInput from '../Input';
import SearchIconSvg from './search.svg';

const baseStyles = css`
  label: search-input;
  position: relative;
`;

const inputStyles = ({ theme }) => css`
  label: search-input__input;
  padding-left: calc(
    ${theme.spacings.kilo} + ${theme.spacings.mega} + ${theme.spacings.kilo}
  );
`;

const iconStyles = ({ theme }) => css`
  label: search-input__icon;
  height: ${theme}
  left: ${theme.spacings.kilo};
  position: absolute;
  ${size(theme.spacings.mega)};
  top: 50%;
  transform: translateY(-50%);
`;

const disabledIconStyles = ({ disabled }) => {
  if (!disabled) {
    return '';
  }
  return css`
    label: search-input__icon--disabled;
    opacity: 0.4;
  `;
};

/**
 * SearchInput component for forms.
 */
const SearchInputWrapper = styled('div')(baseStyles);
SearchInputWrapper.defaultProps = {
  theme: standard
};
const Icon = styled(SearchIconSvg)(iconStyles, disabledIconStyles);
Icon.defaultProps = {
  theme: standard
};

const Input = styled(StandardInput)(inputStyles);
Input.defaultProps = {
  theme: standard
};

const SearchInput = ({ disabled, ...props }) => (
  <SearchInputWrapper role="search">
    <Input {...props} {...{ disabled }} />
    <Icon {...{ disabled }} />
  </SearchInputWrapper>
);

SearchInput.propTypes = {
  /**
   * An ID rendered as data-selector attribute on the
   * component. Used for tracking and e2e testing.
   */
  selector: PropTypes.string.isRequired,
  /**
   * Triggers disabled styles on the component. This is also forwarded as
   * attribute to the <input> element.
   */
  disabled: PropTypes.bool
};

SearchInput.defaultProps = {
  disabled: false
};

/**
 * @component
 */
export default SearchInput;
