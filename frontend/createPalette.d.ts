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
