import { hoistStatics, getContext } from 'recompose';
import { CONTEXT } from '.';

export default hoistStatics(getContext(CONTEXT));
