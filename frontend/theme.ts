import {createTheme, ThemeOptions} from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      dark: '#192538',
      main: '#253550',
      light: '#505d73',
    },
    secondary: {
      dark: '#1c4741',
      main: '#28665D',
      light: '#53847d',
    },
    accent: {
      dark: '#934400',
      main: '#D26200',
      light: '#db8133',
    },
    altAccent: {
      dark: '#938300',
      main: '#D2BC00',
      light: '#dbc933',
    },
    background: {
      paper: '#ffffff',
      default: '#ffffff',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: '"Inter",sans-serif',
    h2: {
      fontSize: '26px',
      fontWeight: 'bold',
      margin: '10px 0',
    },
    h3: {
      fontSize: '22px',
      fontWeight: 'bold',
      margin: '10px 0',
    },
    h4: {
      fontSize: '18px',
      fontWeight: 'bold',
      margin: '8px 0',
    },
    h6: {
      fontSize: '.875rem',
      fontWeight: 'bold',
    },
  },
  zIndex: {
    drawer: 1200,
    modal: 1300,
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiToolbar: {
      defaultProps: {
        disableGutters: true,
      },
    },
    MuiButton: {
      defaultProps: {
        size: 'small',
        variant: 'outlined',
        color: 'primary',
      },
    },
    MuiFab: {
      defaultProps: {
        size: 'small',
        variant: 'circular',
        color: 'primary',
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiChip: {
      defaultProps: {
        size: 'small',
        variant: 'outlined',
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        variant: 'outlined',
        color: 'primary',
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
