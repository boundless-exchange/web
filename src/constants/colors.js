import chroma from 'chroma-js';

export const PRIMARY = '#ff3952';

export const MONOCHROME = {
  DARK:  chroma(PRIMARY).mix('#2a2a2a', 0.96).hex(),
  LIGHT: chroma(PRIMARY).mix('#fcfcfc', 0.98).hex(),
};
