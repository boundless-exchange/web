import chroma from 'chroma-js';

export const PRIMARY = '#ff3952';

export const MONOCHROME = {
  DARK:  chroma(PRIMARY).mix('#333333', 0.96).hex(),
  LIGHT: chroma(PRIMARY).mix('#fcfcfc', 0.97).hex(),
};
