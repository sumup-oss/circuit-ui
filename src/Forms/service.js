import classNames from 'classnames';
import { identity, some, values } from 'lodash/fp';

export function isOptional({ validations, meta, styleAsOptional }) {
  const requiredByMeta = meta && meta.required === true;
  const requiredByValidations = validations && validations.required === true;
  const isRequired = some(identity, [requiredByMeta, requiredByValidations]);
  return !isRequired && styleAsOptional !== false;
}

export function getInputClasses(
  { errors, dirty, disabled, optional, className } = {}
) {
  const hasErrors = some(identity, values(errors));
  const classes = {
    'ng-dirty': dirty,
    'ng-valid': !hasErrors,
    'ng-invalid': hasErrors,
    'input--disabled': disabled,
    'input--optional': optional
  };

  return classNames('input', className, classes);
}
