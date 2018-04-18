import { withProps } from 'recompose';

export default withProps(({ selected, ...props }) => ({
  'aria-selected': selected,
  selected,
  ...props
}));
