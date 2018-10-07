import React, { Component } from 'react';

import Frame from '../Frame/Frame';
import createContext, { getTheme } from '../../styles/createContext';
import { MuiThemeProvider } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';

import { CssBaseline, withStyles } from '@material-ui/core';
import FrameContainer from '../../containers/FrameContainer';

const styles = {
  html: {
    height: '100%',
    margin: 0
  }
};

class App extends Component {
  componentWillMount() {
    this.styleContext = createContext();
    this.styleContext.theme = getTheme({palette: 'dark'});
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.ui.palette !== this.props.ui.palette) {
    //   this.styleContext.theme = getTheme(nextProps.ui);
    // }

    this.styleContext.theme = getTheme('dark');
  }


  render() {
    return (
    <div>
      <CssBaseline />
      <JssProvider
        registry={this.styleContext.sheetsRegistry}
        jss={this.styleContext.jss}
        generateClassName={this.styleContext.generateClassName}
      >
        <MuiThemeProvider
          theme={this.styleContext.theme}
          sheetsManager={this.styleContext.sheetsManager}
        >
          <FrameContainer />
        </MuiThemeProvider>
      </JssProvider>
    </div>
    
    );
  }
}

export default withStyles(styles)(App);