import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Snackbar, IconButton } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import Slide from 'material-ui/transitions/Slide';
import CloseIcon from 'material-ui-icons/Close';

const styleSheet = theme => ({
  anchorTopLeft: {
    top: (theme.spacing.unit * 3) + 25
  },
  anchorTopCenter: {
    top: (theme.spacing.unit * 3) + 25
  },
  anchorTopRight: {
    top: (theme.spacing.unit * 3) + 25
  },
  iconContainer: {
    display: 'inline-flex',
    verticalAlign: 'middle',
    alignItems: 'center'
  },
  iconText: {
    marginLeft: 15
  }
});

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orgOpen: props.open,
      open: props.open
    };
  }

  // TODO: Make this a bit less messy xD
  // for example with componentWillUpdate
  // or componentShouldUpdate
  componentWillReceiveProps({ open }) {
    if (this.state.orgOpen !== open) {
      this.setState({ orgOpen: open });
    }
    if (this.state.open !== open && this.state.orgOpen !== open) {
      this.setState({ open });
    }
  }

  handleRequestClose = (event, reason) => {
    if (reason === 'clickaway') return;

    console.log(event, reason);

    this.setState({ open: false });
  }

  close() {
    this.setState({ open: false });
  }

  render() {
    const { classes: {
      anchorTopLeft,
      anchorTopCenter,
      anchorTopRight
    }, classes, message, icon, actions, position, duration, onRequestClose } = this.props;

    const messageContainer = (
      <span id="message-id" className={classes.iconContainer}>
        {icon && React.cloneElement(icon, { style: { width: 32, height: 32 } })}
        <span className={classes.iconText}>{message}</span>
      </span>
    );

    // const actionContainer = [].concat(actions(this), [
    //   <IconButton
    //     key="close"
    //     color="inherit"
    //     className={classes.icon}
    //     onClick={this.handleRequestClose}
    //   >
    //     <CloseIcon />
    //   </IconButton>
    // ]);

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
        open={this.state.open}
        autoHideDuration={duration}
        onRequestClose={onRequestClose || this.handleRequestClose}
        transition={position.animation}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={messageContainer}
        action={actions(this)}
      />
    );
  }
}

/* eslint-disable react/forbid-prop-types */
Message.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  message: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired, // Fix that later...
  actions: PropTypes.func,
  duration: PropTypes.number,
  position: PropTypes.object,
  onRequestClose: PropTypes.func
};
/* eslint-enable react/forbid-prop-types */

Message.defaultProps = {
  open: false,
  actions: () => {},
  duration: null,
  position: {
    vertical: 'bottom',
    horizontal: 'right',
    animation: TransitionLeft
  },
  onRequestClose: undefined
};

export default withStyles(styleSheet)(Message);

export function TransitionLeft(props) {
  return <Slide direction="left" {...props} />;
}

export function TransitionUp(props) {
  return <Slide direction="up" {...props} />;
}

export function TransitionRight(props) {
  return <Slide direction="right" {...props} />;
}

export function TransitionDown(props) {
  return <Slide direction="down" {...props} />;
}

export function CloseAction({ message }) {
  return (
    <IconButton
      key="close"
      color="inherit"
      onClick={() => message.close()}
    >
      <CloseIcon />
    </IconButton>
  );
}

CloseAction.propTypes = {
  message: PropTypes.shape({
    close: PropTypes.func
  }).isRequired
};
