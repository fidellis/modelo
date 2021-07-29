
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './form.css';

function isObject(o) {
  return o && typeof o === 'object';
}

function isArray(a) {
  return a && Array.isArray(a);
}

function getError(props) {
  if (props) {
    const { value, error, required, min, max, minlength, maxlength } = props;
 
  if (required) {
	const text = 'Campo obrigatório.';

	if (Array.isArray(value)) {
	  if (!value.length) return text;
	} else if(typeof value === 'number'){
	  if (!value && value !== 0) return text;
	} else if(typeof value === 'boolean'){
		if(!value && value !== false)  return text;
	} else if (!value) return text;
  }

  if (min && value < min) return `Mínimo ${min}.`;
  if (minlength && value && value.length < minlength) return `Mínimo de ${minlength} caracteres.`;

  if (max && value > max) return `Máximo ${max}.`;
  if (maxlength && value && value.length > maxlength) return `Máximo de ${maxlength} caracteres.`;

  if (error) {
	return typeof error === 'function' ? error() : error;
  }

  }

  return null;
}

function isValidForm() {
  return !document.getElementsByClassName('input-error').length;
}


const InputContainer = ({ children, error, hideError, ...props }) => (
  <div className="input-container">
    <div error={error} className={`children-container ${error ? 'input-error' : ''}`} >               
      {children}
      {error && !hideError && <div className="input-message-error">{error}</div>}    
    </div>
  </div>
);

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: false,
	  hideError: props.hideError,
    };

    this.state.children = this.getInputs(props.children);    
  }

  componentDidMount() {
    this.props.isValid(isValidForm());
  }

  componentWillReceiveProps({ children, hideError }) {
    if (children !== this.props.children) this.setInputs(children);
	if(hideError !== this.props.hideError) this.setState({ hideError }, () => this.setInputs(children));
  }

  setInputs(children){
    this.setState({ children: this.getInputs(children) }, () => {
      const isValid = isValidForm();        
      if (isValid !== this.state.isValid) {
        this.setState({ isValid }, () => this.props.isValid(isValid));
      }
    });
  }

  getInputs(children) {

	if (!isObject(children)) {
      return children;
    } else if (isArray(children)) {
      return children.map(c => this.getInputs(c));
    } else if (children.props.hide) {
      return null;
    } else if(['input','textarea','select'].includes(children.type)){	
	    return (<InputContainer {...children.props} error={getError(children.props)} hideError={this.state.hideError}>{children}</InputContainer>);
    } else if (children.props.children) {
      return { ...children, props: { ...children.props, children: this.getInputs(children.props.children) } };
    } else if(typeof children.type === 'function'){ 
      return (<InputContainer {...children.props} error={getError(children.props)} hideError={this.state.hideError}>{children}</InputContainer>);
    } else {
      return children;	
    }	
  }

  render() {  
    return <div className="form">{this.state.children}</div>;
  }
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  isValid: PropTypes.func.isRequired,  
};

Form.defaultProps = {
  isValid: () => false,
};

export default (Form);


