import chroma from 'chroma-js';

export const BASE   = '#353747';
export const ACCENT = '#ff3952';
export const ACTIVE = '#AA3854';

// Dervied

export const COMPLEMENT = chroma(ACCENT).set('lch.h', 180).css();

// Semantic-ish
export const BACKGROUND = BASE;
export const FOREGROUND = chroma(BASE).luminance(0.885).css();

export const ACCENT_HIGHLIGHT = chroma(ACCENT).luminance(0.106).css();
export const ACTIVE_HIGHLIGHT = chroma(ACTIVE).luminance(0.106).css();

export const NOTICE = {
  FOREGROUND: COMPLEMENT,
  BACKGROUND: chroma(COMPLEMENT).luminance(0.65).css(),
};

export const DIALOG = {
  SHADOW:               chroma(BASE).luminance(0.01).css(),
  BACKGROUND_SUBTLE:    chroma(BASE).luminance(0.062).css(),
  BACKGROUND:           chroma(BASE).luminance(0.093).css(),
  BACKGROUND_HIGHLIGHT: chroma(BASE).luminance(0.125).css(),
  SECONDARY:            chroma(BASE).luminance(0.367).css(),
  FOREGROUND,
};
