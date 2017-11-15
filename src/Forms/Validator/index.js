import { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isEqual } from 'lodash/fp';
import { valueHasChanged, getErrors } from './service';

const VALIDATION_PROP_TYPES = {
  required: PropTypes.bool,
  regex: PropTypes.object,
  caseInsensitive: PropTypes.bool,
  allowSpaces: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  values: PropTypes.array
};

class Validator extends Component {
  static propTypes = {
    validations: PropTypes.shape(VALIDATION_PROP_TYPES),
    fetchRulesFn: PropTypes.func,
    metaPath: PropTypes.string,
    value: PropTypes.any,
    country: PropTypes.string,
    onValidate: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = { meta: {} };
  }

  componentDidMount() {
    this.getRules();
  }

  shouldComponentUpdate(nextProps) {
    const { value, validations, country } = this.props;
    const {
      value: nextValue,
      validations: nextValidations,
      country: nextCountry
    } = nextProps;

    return (
      valueHasChanged(value, nextValue) ||
      nextCountry !== country ||
      !isEqual(validations, nextValidations)
    );
  }

  componentDidUpdate(prevProps) {
    const { country, validations, value } = this.props;
    const { country: prevCountry, validations: prevValidations } = prevProps;

    if (country !== prevCountry || !isEqual(validations, prevValidations)) {
      this.getRules();
      return;
    }

    this.evaluateRules(value);
  }

  evaluateRules(value) {
    const { meta } = this.state;
    const { onValidate } = this.props;

    if (isEmpty(meta)) {
      return;
    }

    const errors = getErrors(meta, value);
    onValidate({ meta, errors });
  }

  getRules() {
    const { metaPath, validations, value, country, fetchRulesFn } = this.props;
    if (!metaPath) {
      this.setAndEvaluate(validations, value);
      return;
    }

    // Otherwise, fetch validations from the server
    fetchRulesFn(metaPath, country).then(meta => {
      const combinedValidations = { ...meta, ...validations };
      this.setAndEvaluate(combinedValidations, value);
    });
  }

  setAndEvaluate(meta, value) {
    this.setState({ meta }, () => this.evaluateRules(value));
  }

  // eslint-disable-next-line
  render() {
    return null;
  }
}

export default Validator;
