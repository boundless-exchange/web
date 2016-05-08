// Base Typographical Styles

export function compactHeader(fontSize, letterSpacing = 0) {
  return {
    fontFamily: 'Fela-Light',
    fontWeight: 300,
    lineHeight: 0.8333,
    fontSize: fontSize * 1.21,
    letterSpacing: `${letterSpacing}em`,
    marginLeft: '-0.075em',
    marginRight: `-${0.1 + letterSpacing}em`,
  };
}

export const SIZES = {
  HEADING: {
    1: 48,
    2: 36,
    3: 30,
    4: 24,
    5: 20,
    6: 16,
  },
  COPY: 16,
};

// Semantic Styles

export const COPY = {
  fontFamily: 'Lato-Regular',
  lineHeight: 1.45,
  fontSize: SIZES.COPY,
};

export const HEADING = {
  1: {
    ...compactHeader(SIZES.HEADING[1]),
  },
  2: {
    ...compactHeader(SIZES.HEADING[2]),
  },
  3: {
    ...compactHeader(SIZES.HEADING[3]),
  },
  4: {
    ...compactHeader(SIZES.HEADING[4]),
  },
  5: {
    ...compactHeader(SIZES.HEADING[5]),
  },
  6: {
    ...compactHeader(SIZES.HEADING[6]),
  },
};
