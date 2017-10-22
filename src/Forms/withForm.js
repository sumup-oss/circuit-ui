import { hoistStatics, getContext } from 'recompose';
import { CONTEXT } from './Form';

export default hoistStatics(getContext(CONTEXT));
