import React, { Component } from 'react';
import ComponentContainer from './ComponentContainer';

class TextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }

  render() {
    const { label, maxLength, value, onChange, info, onBlur, textAlign, ...props } = this.props;
    // const info = maxLength ? `${value.length} / ${maxLength}` : null;
    return (
      <ComponentContainer label={label} info={info}>
        <input
          style={{ textAlign }}
          {...props}
          value={value}
          maxLength={maxLength}
          onChange={e => onChange({ e, id: e.target.id, value: e.target.value })}
          onBlur={e => onBlur({ e, id: e.target.id, value: e.target.value, error: error => this.setState({ error }) })}
          info={info}
          className="input input-text"
        />
      </ComponentContainer>);
  }
}

TextInput.defaultProps = {
  value: '',
  onBlur: () => null,
  type: 'text',
};

export default TextInput;
