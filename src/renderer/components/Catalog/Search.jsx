/* eslint-disable react/forbid-prop-types */

import _ from 'lodash';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Search as SearchIcon, Close as CloseIcon } from 'material-ui-icons';
import { fade } from 'material-ui/styles/colorManipulator';
import { withStyles } from 'material-ui/styles';
import { IconButton } from 'material-ui';

const styles = theme => ({
  wrapper: {
    display: 'flex',
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    borderRadius: 2,
    transition: theme.transitions.create('background'),
    background: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      background: fade(theme.palette.common.white, 0.25),
    },
    '& $input': {
      transition: theme.transitions.create('width'),
      width: 200,
      '&:focus': {
        width: 250,
      },
    },
  },
  search: {
    flex: 1,
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    font: 'inherit',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit * 9}px`,
    border: 0,
    background: 'none',
    color: 'inherit',
    width: '100%',
    '&:focus': {
      outline: 0,
    }
  },
  clear: {
    height: 35,
    width: 35,
    marginLeft: -35,
    // pointerEvents: 'none',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  }
});

class Search extends Component {
  state = {
    value: ''
  }

  componentWillMount() {
    this.setState({ value: this.props.initialValue });
  }

  handleClear = () => {
    this.setState({ value: '' });
    this.props.onChange('');
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.debouncedCallback();
  };

  debouncedCallback = _.debounce(() => {
    this.props.onChange(this.state.value);
  }, 500);

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.search}>
          <SearchIcon />
        </div>
        <input value={this.state.value} className={classes.input} onChange={this.handleChange} />
        {this.state.value && <IconButton className={classes.clear} onClick={this.handleClear}>
          <CloseIcon />
        </IconButton>}
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
  initialValue: PropTypes.string,
  onChange: PropTypes.func,
};

Search.defaultProps = {
  initialValue: '',
  onChange: () => {}
};

export default withStyles(styles)(Search);
