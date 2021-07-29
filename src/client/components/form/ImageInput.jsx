import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { uploadApi } from '~/lib/api';
import config from '~/config';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));
const Input = ({ value, ...props }) => {
  const classes = useStyles();
  const [id, setId] = useState(value);

  useEffect(() => {
    setId(value);
  }, [value]);
  function uploadFile(e) {
    const files = e.target.files;
    const formData = new FormData();
    formData.append('file', files[0]);

    uploadApi.post(`/upload/${props.diretorioId}`, formData).then((response) => {
      setId(response.data.id);
      props.onChange({ ...props, file: response.data });
    });
  }

  return (
    <div>
      {/* <input {...props} id="input-file" type="file" onChange={file => uploadFile(file)} /><br /> */}

      <input onChange={file => uploadFile(file)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>

      {id && <img src={`${config.arquivoUrl}/${id}`} width="80%" alt="" />}
    </div>);
};

Input.PropTypes = {};

Input.defaultProps = {};

export default Input;
