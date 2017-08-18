import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = {
  content: {
    paddingTop: 64,
    flex: '1 1 100%',
    maxWidth: '100%'
  }
};

function AppContent(props) {
  const { classes, children } = props;

  return (
    <div className={classes.content}>
      {children}
    </div>
  );
}

/* eslint-disable react/forbid-prop-types */
AppContent.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styleSheet)(AppContent);
