/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styleSheet = {
  content: {
    flex: '1 1 100%',
    width: '100%',
    height: '100vh',
    position: 'relative',
    top: -29,
  }
};

function ViewContent(props) {
  const { classes, children } = props;

  return (
    <div className={classes.content}>
      {children}
    </div>
  );
}

ViewContent.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(ViewContent);
