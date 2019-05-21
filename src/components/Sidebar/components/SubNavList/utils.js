import { findIndex } from 'lodash/fp';
import { isArray } from '../../../../util/type-check';

const getSelectedChildIndex = children =>
  isArray(children) ? findIndex(child => child.props.selected, children) : 0;

export default getSelectedChildIndex;
