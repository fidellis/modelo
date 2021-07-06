import React, { PureComponent } from 'react';
import Select from 'react-select';
import ComponentContainer from './ComponentContainer';
// import './react-select.css';

function convertOptions({ options, optionValue, optionLabel, labelRenderer }) {
  return options.map(option => ({ ...option, value: option[optionValue], label: labelRenderer ? labelRenderer(option) : option[optionLabel] }));
}

class InputSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { label, isMulti, value, onChange, id, optionValue, optionLabel, labelRenderer, style, ...inputProps } = this.props;
    const options = convertOptions({ options: this.props.options, optionValue, optionLabel, labelRenderer });

    return (
      <ComponentContainer label={label}>
        <Select
          {...inputProps}
          closeMenuOnSelect={!isMulti}
          value={(isMulti ? options.filter(o => (Array.isArray(value) ? value : [value]).includes(o.value)) : options.find(o => o.value == value)) || ''}
          options={options}
          ignoreAccents
          isMulti={isMulti}
          id={id}
          styles={{ 
				container: provided => ({ ...provided, ...style  }),				
				menu: provided => ({ ...provided, zIndex: 999 }), 
				//control: provided => ({ ...provided, height: 18, minHeight: 18 }),
				//placeholder: provided => ({ ...provided, height: 18, minHeight: 18 }),
				//valueContainer: provided => ({ ...provided, height: 18, minHeight: 18 }),
				//singleValue: provided => ({ ...provided, height: 18, minHeight: 18 }),
				//input: provided => ({ ...provided, height: 18, minHeight: 18 }),										
			}}
          onChange={(v) => {
            let nextValueFormatted = null;
            let selected = null;
            let diff = 0;

            if (isMulti) {
              const nextValue = v || [];
              const previousValue = value || [];
              diff = nextValue.length - previousValue.length;
              nextValueFormatted = nextValue.map(i => i.value);
              if (diff < 0) {
                selected = previousValue.filter(v => !nextValueFormatted.includes(v))[0];
              } else {
                selected = nextValueFormatted.filter(v => !previousValue.includes(v))[0];
              }
            } else {
              nextValueFormatted = (v || {}).value;
            }
			
            onChange({ ...v, id, value: nextValueFormatted, selected, diff });
          }}
        />
      </ComponentContainer>);
  }
}

InputSelect.defaultProps = {
  options: [],
  searchable: true,
  isMulti: false,
  optionValue: 'value',
  optionLabel: 'label',
  clearAllText: 'Remover todos',
  placeholder: '',
  noResultsText: 'Nenhum resultado encontrado.',
  onChange: () => console.log('onchange não definido'),
  autoFocus: false,
  // getOptionLabel: option => null,
};

export default InputSelect;
