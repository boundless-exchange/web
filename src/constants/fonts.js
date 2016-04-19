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
  fontSize: 16,
};
