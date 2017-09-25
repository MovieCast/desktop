import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import getContext, { getTheme } from '../../styles/getContext';
import AppFrame from '../../containers/AppFrame';

class AppWrapper extends React.Component {
  componentWillMount() {
    this.styleContext = getContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.palette !== this.props.ui.palette) {
      this.styleContext.theme = getTheme(nextProps.ui.palette);
    }
  }

  styleContext = null;

  render() {
    const { children } = this.props;

    return (
      <MuiThemeProvider
        theme={this.styleContext.theme}
        sheetsManager={this.styleContext.sheetsManager}
      >
        {children}
      </MuiThemeProvider>
    );
  }
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  ui: PropTypes.object.isRequired,
};

function mapStateToProps({ settings: { ui } }) {
  return { ui };
}

export default withRouter(connect(mapStateToProps)(AppWrapper));
