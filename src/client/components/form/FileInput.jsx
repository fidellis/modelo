import React from 'react';
import PropTypes from 'prop-types';
import { uploadApi } from '~/lib/api';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '~/components/Button';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(0),
    },
  },
  input: {
    display: 'none',
  },
}));

export const msg = txt => dispatch => dispatch({ type: 'SUCCESS', msg: txt });

const Input = (props) => {
  const classes = useStyles();
  function uploadFile(e) {
    const files = e.target.files;
    const formData = new FormData();
    // for (let i = 0; i < files.length; i++) {
    formData.append('file', files[0]);
    // }

    uploadApi.post(`/upload/${props.diretorioId}`, formData).then((response) => {
      props.onChange({
        file: response.data,
        message: (message) => {
          if (message) props.msg(message);
        },
      });
    });
  }

  return (
    <div>
      <input
        onChange={file => uploadFile(file)}
        className={classes.input}
        id="contained-button-file"
        // multiple
        type="file"
      />
      <label htmlFor="contained-button-file" style={{ marginBottom: 0 }}>
        <Button variant="contained" color="primary" component="span">
          {props.label}
        </Button>
      </label>

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
