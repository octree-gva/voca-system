import {createTheme, ThemeOptions} from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#4e342e',
    },
    secondary: {
      main: '#bf360c',
    },
  },
  typography: {
    fontFamily: 'Inter',
    h1: {
      fontFamily: 'Open Sans',
    },
    h2: {
      fontFamily: 'Open Sans',
    },
    h3: {
      fontFamily: 'Open Sans',
    },
    h4: {
      fontFamily: 'Open Sans',
    },
    h5: {
      fontFamily: 'Open Sans',
    },
    h6: {
      fontFamily: 'Open Sans',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 2,
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: 'primary',
      },
    },
    MuiButton: {
      defaultProps: {
        size: 'large',
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        size: 'large',
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFab: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFormControl: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiRadio: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiSwitch: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
  },
};
// Create a theme instance.
const theme = createTheme(themeOptions);

export default theme;
