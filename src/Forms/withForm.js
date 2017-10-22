import { hoistStatics, getContext } from 'recompose';
import { FORM_CONTEXT } from './Form';

export default hoistStatics(getContext(CONTEXT));
