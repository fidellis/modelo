import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '~/components/Button';

const Component = ({ children, title, actions, ...props }) => (
  <Dialog
    {...props}
  >
    <DialogTitle >{title}</DialogTitle>
    <DialogContent>
      <DialogContentText >
        {children}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      {actions.map(action => (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      ))}
    </DialogActions>
  </Dialog>
);

Component.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  actions: PropTypes.array,
};

Component.defaultProps = {
  title: undefined,
  actions: [],
};

export default Component;
