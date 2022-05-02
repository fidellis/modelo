import React from 'react';
import Progress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';


const Component = props => (
    <center style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 9999 }}><Progress /></center>
);

Component.defaultProps = {};

export default Component;