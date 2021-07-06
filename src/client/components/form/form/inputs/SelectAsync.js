import React, { PureComponent } from 'react';
import Select from 'react-select/async';
import ComponentContainer from './ComponentContainer';
import './react-select.css';

function convertOptions({ options, optionValue, optionLabel, labelRenderer }) {
  return options.map(option => ({ ...option, value: option[optionValue], label: labelRenderer ? labelRenderer(option) : option[optionLabel] }));
}

class SelectAsync extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };

    this.promiseOptions = this.promiseOptions.bind(this);
  }

  componentDidMount() {
    const { value } = this.state;
    if (value) {
      this.setValue(value);
    }
  }

  componentWillReceiveProps({ value }) {
    if (value !== this.props.value) {
      this.setValue(value);
    }
  }

  setValue(value) {
    Promise.resolve(this.props.getOptions(value)).then((data) => {
      this.setState({ value: data[0] });
    });
  }

  promiseOptions(inputValue) {
    // if (inputValue) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.props.isDisabled ? () => {} : this.props.getOptions(inputValue, this.props.params));
      }, 500);
    });
    // }
    // return Promise.resolve();
  }

  render() {
    const { label, isMulti, value, getOptions, onChange, id, optionValue, optionLabel, labelRenderer, style, ...inputProps } = this.props;

    return (
      <ComponentContainer label={label}>
        <Select
          {...inputProps}
          closeMenuOnSelect={!isMulti}
          loadOptions={this.promiseOptions}
          value={this.state.value || ''}
          cacheOptions
          defaultOptions
          onChange={v => onChange({ ...v, id })}
          styles={{ container: provided => ({ ...provided, ...style }), menu: provided => ({ ...provided, zIndex: 999 }) }}
        />
      </ComponentContainer>
    );
  }
}

SelectAsync.defaultProps = {
  options: [],
  searchable: true,
  isMulti: false,
  optionValue: 'value',
  optionLabel: 'label',
  clearAllText: 'Remover todos',
  placeholder: '',
  noResultsText: 'Nenhum resultado encontrado.',
  onChange: () => console.log('onchange não definido'),
  // params: {
  //   limit: 10,
  // },
  // getOptionLabel: option => null,
};

export default SelectAsync;
