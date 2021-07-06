import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '~/components/Dialog';

class Expirado extends Component {
  logoff() {
    window.location.reload();
  }

  render() {
    const { expirado } = this.props;

    return (

      <Dialog
        id="expirado"
        onClose={this.logoff}
        open={expirado}
        title="Sessão encerrada"
        actions={[
          {
            label: 'fazer login',
            onClick: this.logoff,
          },
        ]}
      >
        Sua sessão foi encerrada. Clique no botão abaixo para continuar.
      </Dialog>
    );
  }
}

Expirado.propTypes = {
  expirado: PropTypes.bool.isRequired,
};

export default Expirado;
