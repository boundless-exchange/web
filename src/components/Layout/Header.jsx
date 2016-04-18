import { StyleSheet } from 'react-look';
import InlineSvg from 'svg-inline-react';

import { sizes } from '../../constants';

const CONTENT_HEIGHT = 64;
const FULL_HEIGHT    = CONTENT_HEIGHT + sizes.SPACING.NORMAL * 2;

const STYLES = StyleSheet.create({
  root: {
    maxWidth: sizes.MAX_CONTENT_WIDTH + sizes.SPACING.NORMAL * 2,
    margin: '0 auto',
    padding: sizes.SPACING.NORMAL,
  },
  icon: {
    height: CONTENT_HEIGHT,
  },
});

export default function Header({className}) {
  return (
    <header className={`${STYLES.root} ${className}`}>
      <InlineSvg raw src={require('svg-inline!../../assets/logo.svg')} className={STYLES.icon} />
    </header>
  );
}

Header.FULL_HEIGHT = FULL_HEIGHT;
