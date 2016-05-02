import chroma from 'chroma-js';

export const BASE   = '#353747';
export const ACCENT = '#e22a6c';

// Semantic-ish
export const BACKGROUND = BASE;

export const ACCENT_HIGHLIGHT = chroma(ACCENT).luminance(0.106).css();

export const DIALOG = {
  SHADOW:               chroma(BASE).luminance(0.01).css(),
  BACKGROUND:           chroma(BASE).luminance(0.093).css(),
  BACKGROUND_HIGHLIGHT: chroma(BASE).luminance(0.062).css(),
  SECONDARY:            chroma(BASE).luminance(0.367).css(),
  FOREGROUND:           chroma(BASE).luminance(0.885).css(),
};
