import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {
  Avatar,
  List, ListItem, ListItemAvatar, ListItemText,
  Dialog, DialogTitle
} from 'material-ui';

import { Add as AddIcon } from 'material-ui-icons';

import blue from 'material-ui/colors/blue';

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class SubtitleDialog extends Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedSubtitle);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, open, subtitles } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">Select subtitle</DialogTitle>
        <div>
          {subtitles.map(subtitle => (
            <List>
              <ListItem button onClick={() => this.handleListItemClick(subtitle)}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <AddIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Custom" />
              </ListItem>
            </List>
          ))}
          <List>
            <ListItem button onClick={() => this.handleListItemClick('customSubtitle')}>
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Custom" />
            </ListItem>
          </List>
        </div>
      </Dialog>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
SubtitleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  selectedSubtitle: PropTypes.string,
  subtitles: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired
  })),
  onClose: PropTypes.func
};
/* eslint-enable react/forbid-prop-types */

SubtitleDialog.defaultProps = {
  subtitles: [],
  selectedSubtitle: null,
  onClose: () => {}
};

export default withStyles(styles)(SubtitleDialog);
