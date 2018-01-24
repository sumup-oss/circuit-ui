import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { size } from 'polished';

import { standard } from '../../themes';
import { Input as StandardInput } from '../Input';
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

/**
 * SearchInput component for forms.
 */
const SearchInputWrapper = styled('div')(baseStyles);
SearchInputWrapper.defaultProps = {
  theme: standard
};
const Icon = styled(SearchIconSvg)(iconStyles);
Icon.defaultProps = {
  theme: standard
};

const Input = styled(StandardInput)(inputStyles);
Input.defaultProps = {
  theme: standard
};

const SearchInput = props => (
  <SearchInputWrapper role="search">
    <Input {...props} />
    <Icon />
  </SearchInputWrapper>
);

SearchInput.propTypes = {
  /**
   * A Circuit UI theme object. Usually provided by a ThemeProvider.
   */
  theme: PropTypes.object,
  /**
   * An ID passed to the <input> element via a data attribute. This
   * is used as an identifier for analytics tracking and e2e testing.
   */
  analyticsId: PropTypes.string
};

SearchInput.defaultProps = {
  theme: standard
};

/**
 * @component
 */
export default SearchInput;
