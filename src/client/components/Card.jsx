import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '~/components/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Component = ({ children, title, actions, width, ...props }) => {
    const classes = useStyles();
    return(
      <div style={{ marginLeft: 'auto', marginRight: 'auto', width }}>
        <Card className={classes.root} {...props}>        
            <CardContent>
                {children}
            </CardContent>        
            <CardActions>
              {actions.map(({ component, label, ...action }) => component || <Button color="" size="small" {...action}>{label}</Button>)}            
            </CardActions>

        </Card>
      </div>)
};

Component.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  actions: PropTypes.array,
};

Component.defaultProps = {
  title: undefined,
  actions: [],
  width: '100%'
};

export default Component;
