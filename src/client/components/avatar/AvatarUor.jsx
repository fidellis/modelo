import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';

import {
  HUMANOGRAMA_URL,
  AVATAR_URL,
} from '~/lib/constants';

const AvatarUsuario = ({ chave, uor, uor_id, ...props }) => (
  <a href={`${HUMANOGRAMA_URL}/uor/${uor_id}`} target="_blank">
    <Avatar
      src={`${AVATAR_URL}${chave}`}
      title={uor}
      {...props}
    />
  </a>

);

AvatarUsuario.propTypes = {
  chave: PropTypes.string.isRequired,
};

export default AvatarUsuario;
