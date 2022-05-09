import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';

class SnackbarWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      message: null,
    };

    this.handleClose = this.handleClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mensagens !== this.props.mensagens) {
      const message = nextProps.mensagens.slice(this.props.mensagens.length).join();
      this.setState({ message });
    }

    if (nextProps.erros !== this.props.erros) {
      const error = nextProps.erros.slice(this.props.erros.length).join();
      this.setState({ error });
    }
  }

  handleClose() {
    this.setState({ message: null });
  }

  render() {
    const { message, error } = this.state;

    return (
      <Snackbar
        open={!!message}
        autoHideDuration={4000}
        onClose={this.handleClose}
        message={message}
      />
    );
  }
}

SnackbarWrapper.propTypes = {
  mensagens: PropTypes.array,
  erros: PropTypes.array,
};

SnackbarWrapper.defaultProps = {
  mensagens: [],
  erros: [],
};


export default SnackbarWrapper;
