import { isEmpty } from 'lodash/fp';
import { isArray } from '../../../../util/type-check';

const hasSelectedChild = children => {
  if (children) {
    return isArray(children)
      ? !isEmpty(children.filter(item => item.props.selected))
      : children.props.selected;
  }
  return false;
};

export default hasSelectedChild;
