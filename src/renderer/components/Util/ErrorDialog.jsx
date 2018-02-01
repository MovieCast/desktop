import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from 'material-ui';

export default class ErrorDialog extends Component {
  static propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    error: PropTypes.string,
    onClose: PropTypes.func
  }

  static defaultProps = {
    open: false,
    title: '',
    message: '',
    error: '',
    onClose: () => {}
  }

  render() {
    const { open, title, message, error, onClose } = this.props;

    return (
      <Dialog open={open} onRequestClose={onClose}>
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
          <pre style={{ whiteSpace: 'pre-line' }}>
            {error}
          </pre>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">
              Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
