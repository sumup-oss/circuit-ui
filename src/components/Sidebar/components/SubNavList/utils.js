import { isArray } from '../../../../util/type-check';

const getSelectedChildIndex = children =>
  isArray(children) ? children.findIndex(child => child.props.selected) : 0;

export default getSelectedChildIndex;
