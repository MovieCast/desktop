/* eslint-disable no-underscore-dangle */

import { create } from 'jss';
import preset from 'jss-preset-default';
import { SheetsRegistry } from 'react-jss/lib/jss';
import { createMuiTheme } from 'material-ui/styles';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

export function getTheme(paletteType) {
  const theme = createMuiTheme({
    palette: {
      type: paletteType
    },
  });

  return theme;
}

const theme = getTheme('dark');

// Configure JSS
const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;

function createContext() {
  return {
    jss,
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
  };
}

export default function getContext() {
  // Reuse context on the client-side
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
