import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from 'material-ui';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import Slide from 'material-ui/transitions/Slide';

const styleSheet = createStyleSheet('Message', theme => ({
  anchorTopLeft: {
    top: (theme.spacing.unit * 3) + 64
  },
  anchorTopCenter: {
    top: (theme.spacing.unit * 3) + 64
  },
  anchorTopRight: {
    top: (theme.spacing.unit * 3) + 64
  }
}));

function Message(props) {
  const { classes: {
    anchorTopLeft,
    anchorTopCenter,
    anchorTopRight }, open, message, action, position, onRequestClose } = props;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: position.vertical,
        horizontal: position.horizontal,
      }}
      classes={{
        anchorTopLeft,
        anchorTopCenter,
        anchorTopRight
      }}
      open={open}
      onRequestClose={onRequestClose}
      transition={<Slide direction={position.direction} />}
      SnackbarContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{message}</span>}
      action={action}
    />
  );
}

/* eslint-disable react/forbid-prop-types */
Message.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  message: PropTypes.string.isRequired,
  action: PropTypes.array,
  position: PropTypes.object,
  onRequestClose: PropTypes.func
};
/* eslint-enable react/forbid-prop-types */

Message.defaultProps = {
  open: false,
  action: [],
  position: {
    vertical: 'top',
    horizontal: 'right',
    direction: 'left'
  },
  onRequestClose: () => {}
};

export default withStyles(styleSheet)(Message);
