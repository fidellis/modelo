import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AcessoNegadoPage from '~/components/message/AcessoNegadoPage';

class PrivateComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: props.params,
    };
  }

  componentWillReceiveProps({ params }) {
    if (params !== this.props.params) {
      this.setState({ params });
    }
  }
  render() {
    const { usuario, acessos, allow, component, message, ...props } = this.props;
    let isAllowed = allow;

    if (typeof allow === 'function') {
      isAllowed = allow({ usuario, acessos, params: this.props.match.params });
    }

    return (
      isAllowed ? (
        React.createElement(component, { ...props, usuario, acessos })
      ) : (
        <AcessoNegadoPage message={'Você não possui acesso a esta página.'} />
      )
    );
  }
}

PrivateComponent.propTypes = {
  acessos: PropTypes.array,
  usuario: PropTypes.object,
  component: PropTypes.element.isRequired,
  message: PropTypes.node,
  allow: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  params: PropTypes.object,
};

PrivateComponent.defaultProps = {
  acessos: [],
  usuario: null,
  message: null,
  allow: true,
  params: null,
};

export default PrivateComponent;
