import { createMuiTheme, createPalette } from 'material-ui/styles';

export default function createTheme(palette) {
  const initialTheme = {
    overrides: {
      MuiToolbar: {
        root: {
          minHeight: 64,
          maxHeight: 64
        }
      },
    }
  };

  return createMuiTheme({
    palette: getMuiPalette(palette.toLowerCase()),
    ...initialTheme
  });
}

// Preparation for our own palettes
function getMuiPalette(type) {
  // Well we dont have palettes yet...sowuhmm eh
  const palette = createPalette({
    type
  });

  return palette;
}
