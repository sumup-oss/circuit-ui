import classNames from 'classnames';
import { curry, reduce, findKey, identity, some, values } from 'lodash/fp';

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

export const setFormMeta = curry((field, meta, formData) => {
  const newMeta = {
    ...formData.meta,
    [field]: {
      ...formData.meta[field],
      ...meta
    }
  };

  return { ...formData, meta: newMeta };
});

export const setFormErrors = curry((field, errs, formData) => {
  const errors = {
    ...formData.errors,
    [field]: {
      ...formData.errors[field],
      ...errs
    }
  };

  const valid = reduce(
    (memo, errorMap) => {
      if (findKey(errorMap)) {
        return false;
      }
      return memo;
    },
    true,
    errors
  );

  return { ...formData, errors, valid };
});
