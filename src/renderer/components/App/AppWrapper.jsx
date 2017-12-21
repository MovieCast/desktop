/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import JssProvider from 'react-jss/lib/JssProvider';

import createContext, { getTheme } from '../../styles/createContext';
// import AppFrame from '../../containers/AppFrame';

class AppWrapper extends React.Component {
  componentWillMount() {
    this.styleContext = createContext();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.palette !== this.props.ui.palette) {
      this.styleContext.theme = getTheme(nextProps.ui);
    }
  }

  styleContext = null;

  render() {
    const { children } = this.props;

    return (
      <JssProvider
        registry={this.styleContext.sheetsRegistry}
        jss={this.styleContext.jss}
        generateClassName={this.styleContext.generateClassName}
      >
        <MuiThemeProvider
          theme={this.styleContext.theme}
          sheetsManager={this.styleContext.sheetsManager}
        >
          {children}
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  ui: PropTypes.object.isRequired
};

function mapStateToProps({ settings: { ui } }) {
  return { ui };
}

export default connect(mapStateToProps)(AppWrapper);
