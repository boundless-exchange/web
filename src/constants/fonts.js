export function compactHeader(fontSize, letterSpacing = 0) {
  return {
    fontFamily: 'Fela-Light',
    lineHeight: 0.75,
    fontSize: fontSize * 1.25,
    letterSpacing: `${letterSpacing}em`,
    marginLeft: '-0.075em',
    marginRight: `-${0.1 + letterSpacing}em`,
  };
}

export const BODY = {
  fontFamily: 'Lato-Regular',
  lineHeight: 1.45,
};

export const HEADER_BASE = {
  fontFamily: 'Fela-Light',
  lineHeight: 0.75,
};

export const HEADER = {
  MEDIUM: {
    ...HEADER_BASE,
    fontSize: 24,
  },
};
