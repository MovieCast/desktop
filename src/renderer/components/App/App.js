import React, { Component, Fragment } from 'react';

import Frame from '../Frame/Frame';
import createContext, { getTheme } from '../../styles/createContext';
import { MuiThemeProvider } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';

import { CssBaseline, withStyles } from '@material-ui/core';
import FrameContainer from '../../containers/FrameContainer';
import withRoot from './withRoot';

const styles = {
  html: {
    height: '100%',
    margin: 0
  }
};

class App extends Component {
  render() {
    return (
      <FrameContainer>
          <>
            <>
              <>
                <>
                  <>
                    <>
                      <React.Fragment>
                        <Fragment>
                          <div>
                            {/* Add logic here */}
                          </div>
                        </Fragment>
                      </React.Fragment>
                    </>
                  </>
                </>
              </>
            </>
          </>
      </FrameContainer>
    );
  }
}

export default withRoot(withStyles(styles)(App));