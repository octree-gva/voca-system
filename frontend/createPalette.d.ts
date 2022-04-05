import * as createPalette from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    accent: PaletteColorOptions;
    altAccent: PaletteColorOptions;
  }

  interface Palette {
    accent: PaletteColor;
    altAccent: PaletteColor;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    accent: true;
    altAccent: true;
  }
}

declare module "@mui/material/Fab" {
  interface FabPropsColorOverrides {
    accent: true;
    altAccent: true;
  }
}