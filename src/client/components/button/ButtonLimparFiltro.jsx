import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from './Button';
import { clearFilters } from '~/store/filter';

const styles = {
    btn: {
        // fontSize: '10px',
    },
};
const Component = props => (
    <Button
        style={styles.btn}
        onClick={() => props.clearFilters()}
        variant="outlined"
        {...props}
    >
        Limpar Filtros
    </Button>
);

Component.propTypes = {
    clearFilters: PropTypes.func.isRequired,
};

Component.defaultProps = {

};

export default connect(() => { }, { clearFilters })(Component);