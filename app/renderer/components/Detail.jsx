import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStyleSheet, withStyles } from 'material-ui/styles';

const styleSheet = createStyleSheet('Detail', {
  root: {
    position: 'relative',
    marginTop: '-64px',
  },
  poster: {
    height: '100vh',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    position: 'absolute',
    backgroundSize: 'cover',
    zIndex: 1
  },
  content: {
    height: '100vh',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    position: 'absolute',
    backgroundSize: 'cover',
    zIndex: 2
  }
});

class Detail extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.fetchItem(id);
    this.props.setCustomTitle(true);
  }

  componentWillReceiveProps({ item: { title } }) {
    if (title) {
      this.props.setCustomTitle(title);
    }
  }

  componentWillUnmount() {
    this.props.setCustomTitle(false);
  }

  render() {
    const { item, classes } = this.props;
    return (
      <div className={classes.root}>
        <img className={classes.poster} src={item.background_image} alt={item.title} />
        <div className={classes.content}>
          {/*
            TODO: ->
            - Back + Title
            - Cover | Content
            - Controls container
          */}
        </div>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
Detail.propTypes = {
  item: PropTypes.object,
  match: PropTypes.object.isRequired,
  fetchItem: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  setCustomTitle: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types */

Detail.defaultProps = {
  item: {}
};

export default withStyles(styleSheet)(Detail);
