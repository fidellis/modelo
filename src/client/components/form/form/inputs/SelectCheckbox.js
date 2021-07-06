 import React, { Component, useState, useEffect } from 'react';
import ComponentContainer from './ComponentContainer';
import './select-check-box.css';


function convertOptions({ options, optionValue, optionLabel, labelRenderer }) {
  return options.map(option => ({ value: option[optionValue], label: labelRenderer ? labelRenderer(option) : option[optionLabel] })).slice();
}

class InputSelect extends Component {
	constructor(props) {
		super(props);
		
		const { value, optionValue, optionLabel, labelRenderer } = props;
		const values = value;
		const options = convertOptions({ options: props.options, optionValue, optionLabel, labelRenderer });
		
		this.state = {
			expanded: false,			
			values,
			options,
			selectedOptions: this.getSelected({ options, values }),
			//initialOptions: options,
			
		};
		
		document.addEventListener('click', evt => {var path = event.path || (event.composedPath && event.composedPath());
		  var path = event.path || (event.composedPath && event.composedPath());
		  if (path && path.indexOf(document.querySelector('.multiselect')) < 0) {
			document.getElementById("checkboxes").style.display = "none";
			this.setState({ expanded: false })
		  }
		}, true);
		
		this.showCheckboxes = this.showCheckboxes.bind(this)
	  }
	
	componentWillReceiveProps({ value, options }){
		if(value !== this.props.value){
			this.setState({ 
				values: value,
				selectedOptions: this.getSelected({ values: value, options })
			})
		}		
	}
	
  	onChange({ checked, value, selectedOption }){
		const { onChange, id }  = this.props;
		const { options }  = this.state;
		const values = this.state.values.slice();
		if (checked) {
      		values.push(value);
		} else {
			const indexSelected = values.indexOf(value);
			values.splice(indexSelected, 1);
		}
		
		this.setState({ values }, () => {			
			this.props.onChange({ id, value: values, selectedValue: value, selectedOption, selectedOptions: this.getSelected({ values, options }) })
		})
		
	}
	
	getSelected({ options, values }) {	
		return options.filter(o => values.includes(o.value));
	}
	
	isSelected(option) {
      return this.state.values.some(v => {
        return JSON.stringify(v) === JSON.stringify(option.value);
      });
    }
	
	renderSelectedLabel(){
		return this.state.selectedOptions.map(o => o.label).join(', ');
	}
	
	showCheckboxes() {
		const checkboxes = document.getElementById("checkboxes");

		if (!this.state.expanded) {
			checkboxes.style.display = "block";
			this.setState({expanded:true});
		} else {
			checkboxes.style.display = "none";
			this.setState({expanded:false});
		}

	}
	render(){
		const { label, placeholder, optionValue, optionLabel, labelRenderer, width, ...inputProps }  = this.props;
		const { options } = this.state;
	
		return (
		  <ComponentContainer label={label}>
			<div className="multiselect">	
				<div className="selectBox" onClick={this.showCheckboxes}>			
				  <select
					  {...inputProps}
					  className="input input-select"				  
					>
						<option>{this.renderSelectedLabel() || placeholder}</option>
					</select>
				  <div className="overSelect"></div>
				</div>
				<div id="checkboxes" className="checkboxes">
					{options.map((option,i) => (					 
						 <label htmlFor={option.value} className="input-select-option">
							<input 
								type="checkbox"
								id={option.value} 
								value={option.value}
								onChange={(e) => this.onChange({ checked: e.target.checked, value: option.value, selectedOption: option, e })}
								checked={this.isSelected(option)}
								/>
								{option.label}
						</label>						
					))}
				</div>
			</div>
			

		  </ComponentContainer>);
		
	}
    
}

InputSelect.defaultProps = {
  options: [],
  value:[],
  //searchable: true,
  //isMulti: false,
  optionValue: 'value',
  optionLabel: 'label',
  width: null,
  //clearAllText: 'Remover todos',
  //placeholder: '',
  //noResultsText: 'Nenhum resultado encontrado.',
  //onChange: () => console.log('onchange não definido'),
  //autoFocus: false,
  // getOptionLabel: option => null,
};

export default InputSelect;

/*
<div className="multiselect">	
	<div className="selectBox" onClick={this.showCheckboxes}>			
	  <select
		  {...inputProps}
		  className="input input-select"				  
		>
			<option>{this.renderSelectedLabel() || placeholder}</option>
		</select>
	  <div className="overSelect"></div>
	</div>
	<div id="checkboxes" className="checkboxes">
		{options.map(option => (					 
			 <label htmlFor={option.value} >
				<input 
					type="checkbox"
					id={option.value} 
					value={option.value}
					onChange={(e) => this.onChange({ checked: e.target.checked, value: option.value, selectedOption: option, e })}
					checked={this.isSelected(option)}
					/>
					{option.label}
			</label>						
		))}
	</div>
</div>
*/
