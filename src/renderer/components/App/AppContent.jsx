import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styleSheet = {
  content: {
    // paddingTop: 64,
    flex: '1 1 100%',
    width: '100%',
    // height: 'calc(100vh - 64px - 29px)',
    height: '100vh',
    position: 'relative',
    top: -29,
    // marginTop: 'calc(64px + 29px)'
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
