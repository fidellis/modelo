import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api, { uploadApi, getData } from '~/lib/api';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '~/components/Button';
import { TextInput } from '~/components/form/form';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(0),
    },
  },
  input: {
    display: 'none',
  },
  inputName: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  button:{
    marginRight: 5,
    marginBottom: 0
  }
}));

export const msg = txt => dispatch => dispatch({ type: 'SUCCESS', msg: txt });

const Input = (props) => {
  const classes = useStyles();
  const [arquivo, setArquivo] = useState({});

  async function getArquivo(){
    const arquivo = await getData(`/arquivo/arquivo/${props.value}`);    
    setArquivo(arquivo);
  }
  useEffect(() => {
    if(props.value) getArquivo();
  }, [props.value]);

  function uploadFile(e) {
    const files = e.target.files;
    const formData = new FormData();
    // for (let i = 0; i < files.length; i++) {
    formData.append('file', files[0]);
    // }

    uploadApi.post(`/upload/${props.diretorioId}`, formData).then((response) => {
      props.onChange({
        ...props,
        file: response.data,
        message: (message) => {
          if (message) props.msg(message);
        },
      });
    });
  };

  return (
    <div className={classes.inputName}>
      <input
        onChange={file => uploadFile(file)}
        className={classes.input}
        id="contained-button-file"
        // multiple
        type="file"
      />
      <label htmlFor="contained-button-file" className={classes.button}>
        <Button variant="contained" color="primary" component="span">
          {props.label}
        </Button>
      </label>

      <TextInput
        value={arquivo.nome}
      />

      {/* <label htmlFor="input-file" style={styles.label} >{props.label}</label>
      <input {...props} id="input-file" type="file" onChange={file => uploadFile(file)} style={styles.input} multiple={false} /> */}
    </div>);
};

Input.propTypes = {

};

Input.defaultProps = {
  label: 'Upload',
};

export default connect(() => {}, { msg })(Input);
