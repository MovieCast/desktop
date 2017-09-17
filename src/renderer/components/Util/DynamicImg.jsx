/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

const Status = {
  PENDING: 'PENDING',
  LOADING: 'LOADING',
  LOADED: 'LOADED'
};

const styleSheet = theme => ({
  image: {
    transition: theme.transitions.create('opacity'),
    opacity: 0
  },
  loaded: {
    opacity: 1
  }
});

class DynamicImg extends Component {

  state = {
    status: this.props.src ? Status.LOADING : Status.PENDING
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({
        status: nextProps.src ? Status.LOADING : Status.PENDING,
      });
    }
  }

  handleLoad = () => {
    this.setState({
      status: Status.LOADED
    });
  }

  render() {
    const { classes, src, alt, className } = this.props;

    const imgClassname = classNames(classes.image, className, {
      [classes.loaded]: this.state.status === Status.LOADED
    });

    return (
      <img
        className={imgClassname}
        src={src}
        alt={alt}
        onLoad={this.handleLoad}
        onError={console.log}
        draggable={false}
      />
    );
  }
}

DynamicImg.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string
};

DynamicImg.defaultProps = {
  className: '',
  src: undefined,
  alt: ''
};

export default withStyles(styleSheet)(DynamicImg);
