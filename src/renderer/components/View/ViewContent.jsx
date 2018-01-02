/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

const styleSheet = {
  content: {
    flex: '1 1 100%',
    width: '100%',
    height: '100vh',
    position: 'relative',
  },
  heightFix: {
    height: 'calc(100vh - 29px)'
  }
};

class ViewContent extends Component {
  render() {
    const { classes, children, hasStatusBar } = this.props;

    const contentClassName = classNames(classes.content, {
      [classes.heightFix]: hasStatusBar
    });

    return (
      <div className={contentClassName}>
        {children}
      </div>
    );
  }
}

ViewContent.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  hasStatusBar: PropTypes.bool
};

ViewContent.defaultProps = {
  hasStatusBar: true
};

export default withStyles(styleSheet)(ViewContent);
