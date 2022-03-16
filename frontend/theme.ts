import {createTheme, ThemeOptions} from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#243551',
      light: '#2c88d9',
    },
    secondary: {
      main: '#f8f894',
    },
  },
  typography: {
    fontFamily: 'Inter',
    h1: {
      fontFamily: 'Inter',
    },
    h2: {
      fontFamily: 'Inter',
    },
    h3: {
      fontFamily: 'Inter',
    },
    h4: {
      fontFamily: 'Inter',
    },
    h5: {
      fontFamily: 'Inter',
    },
    h6: {
      fontFamily: 'Inter',
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
