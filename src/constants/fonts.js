// Base Typographical Styles

export function compactHeader(fontSize, letterSpacing = 0) {
  return {
    fontFamily: 'Fela-Light',
    lineHeight: 0.8333,
    fontSize: fontSize * 1.21,
    letterSpacing: `${letterSpacing}em`,
    marginLeft: '-0.075em',
    marginRight: `-${0.1 + letterSpacing}em`,
  };
}

export const HEADER_BASE = {
  fontFamily: 'Fela-Light',
  lineHeight: 0.75,
};

export const SIZES = {
  COPY: 16,
  HEADER: 24,
};

// Semantic Styles

export const COPY = {
  fontFamily: 'Lato-Regular',
  lineHeight: 1.45,
  fontSize: SIZES.COPY,
};

export const HEADER = {
  MEDIUM: {
    ...HEADER_BASE,
    fontSize: SIZES.HEADER,
  },
};
