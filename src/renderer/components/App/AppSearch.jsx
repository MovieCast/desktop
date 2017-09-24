import _ from 'lodash';

import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchIcon from 'material-ui-icons/Search';
import { fade } from 'material-ui/styles/colorManipulator';
import { withStyles } from 'material-ui/styles';

import { searchTerm } from '../../../shared/actions/application';
import { fetchMovies, setFilter } from '../../../shared/actions/catalog';

const styles = theme => ({
  wrapper: {
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
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme
      .spacing.unit * 9}px`,
    border: 0,
    background: 'none',
    color: 'inherit',
    width: '100%',
    '&:focus': {
      outline: 0,
    },
  },
});

class AppSearch extends Component {

  state = {
    term: ''
  }

  handleChange = (event) => {
    this.setState({ term: event.target.value });
    this.updateRedux();
  };

  updateRedux = _.debounce(() => {
    this.props.searchTerm(this.state.term);

    this.props.setFilter({
      page: 1,
      keywords: this.state.term
    });
  }, 500);

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.search}>
          <SearchIcon />
        </div>
        <input value={this.state.value} className={classes.input} onChange={this.handleChange} />
      </div>
    );
  }
}

AppSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  searchTerm: PropTypes.func.isRequired
};

function mapStateToProps({ application: { appBar: { term } } }) {
  return { term };
}

export default compose(
  withStyles(styles, {
    name: 'AppSearch',
  }),
  connect(mapStateToProps, { searchTerm, setFilter })
)(AppSearch);
