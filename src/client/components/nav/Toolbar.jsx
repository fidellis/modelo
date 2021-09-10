import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { PROFILE_URL, CORREIO_URL, LOGOFF_URL, AVATAR_URL } from '~/lib/constants';
import { isMobile } from 'react-device-detect';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '~/components/icons/Icon';
import Avatar from '~/components/avatar/AvatarUsuario';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Classificacao from './Classificacao';
import './Nav.scss';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openMenu: false,
    };
  }

  handleClick = (event) => {
    this.setState({ openMenu: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ openMenu: false });
  };

  render() {
    const { usuario, baseUrl, search } = this.props;
    const { chave } = usuario;
    const { openMenu } = this.state;


    const actions = [
      <Classificacao usuario={usuario} />,
      // <Button href={CORREIO_URL} key="mail" icon className="icon">mail</Button>,
      <Icon key="mail" onClick={() => window.open(CORREIO_URL)}>mail</Icon>,
      <Avatar
        key="avatar"
        chave={chave}
        href={`${PROFILE_URL}${chave}`}
      />,
      <Icon key="menu" onClick={this.handleClick}>more_vert</Icon>,
    ];
    return (

      <div className="toolbar">
        <div className="logo"><img src="https://diemp2.intranet.bb.com.br/arquivos/api/arquivo/105" width="100%" /></div>
        <div className="toolbar-container">
          <div className="toolbar-title-container">
            {isMobile && <i className="material-icons">menu</i>}
            <div className="toolbar-title">DIEMP</div>
            <div className="form">{search}</div>
          </div>
          <div className="actions">
            {actions.map(action => <div className="action">{action}</div>)}
          </div>
        </div>
        <Menu
          id="simple-menu"
          anchorEl={openMenu}
          keepMounted
          open={openMenu}
          onClose={this.handleClose}
        >
          <a href={`${PROFILE_URL}${chave}`} target="_blank" rel="noopener noreferrer">
            <MenuItem>
              <ListItemIcon>
                <Icon fontSize="small" >account_box</Icon>
              </ListItemIcon>
              Meu Perfil
            </MenuItem>
          </a>
          <a href={CORREIO_URL} target="blank">
            <MenuItem >
              <ListItemIcon>
                <Icon fontSize="small" >mail</Icon>
              </ListItemIcon>
              Correio
            </MenuItem>
          </a>
          <a href={`${baseUrl}${LOGOFF_URL}${location.href}`}>
            <MenuItem>
              <ListItemIcon>
                <Icon fontSize="small" >exit_to_app</Icon>
              </ListItemIcon>
              Sair
            </MenuItem>
          </a>
        </Menu>
      </div>


    );
  }
}

Nav.propTypes = {
  usuario: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  search: PropTypes.node.isRequired,
};

export default withRouter(Nav);
