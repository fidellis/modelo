import React, { Component } from 'react';
// import Form, { Button } from '~/components/form/form';
import Form from './form';
import Button from '~/components/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const msg = txt => dispatch => dispatch({ type: 'SUCCESS', msg: txt });

const styles = {
  container: {
    marginLeft: 'auto',
    marginRight: 'auto' 
  },
  button: {
    marginRight: 5,
  },
  actions: {
    marginTop: 24,
  },
};
class Formulario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submited: props.submited,
    };
    this.onClickAction = this.onClickAction.bind(this);
  }

  onClickAction({ onClick, type, ...params }) {
    const { action } = this.props;
    if (type === 'submit') {
      this.setState({ submited: true }, () => {
        if (this.state.isValid && action) {
          action({
            ...params,
            message: (message, callback) => {
              if (message) this.props.msg(message);
              if (callback) callback();
            } });
        }
      });
    } else if (onClick) {
      onClick({
        ...params,
        message: (message, callback) => {
          if (message) this.props.msg(message);
          if (callback) callback();
        } });
    }
  }

  render() {
    const { children, isValid, actions, width, ...props } = this.props;

    return (
      <div style={{ ...styles.container, width }}>
        <Form
          {...props}
          isValid={v => this.setState({ isValid: v }, () => (isValid ? isValid(v) : null))}
          hideError={!this.state.submited}
        >
          {children}
        </Form>
        <div style={styles.actions}>
          {actions.filter(a => a.hide !== true).map(({ label, ...actionProps }) => <Button {...actionProps} key={label} onClick={() => this.onClickAction({ label, ...actionProps })} style={styles.button} >{label}</Button>)}
        </div>
      </div>

    );
  }
}

Formulario.propTypes = {
  children: PropTypes.node.isRequired,
  msg: PropTypes.func.isRequired,
  actions: PropTypes.array.isRequired,
  isValid: PropTypes.bool.isRequired,
  width: PropTypes.number,
};

Formulario.defaultProps = {
  actions: [],
  width: '100%',
  submited: false,
};

export default connect(() => {}, { msg })(Formulario);
