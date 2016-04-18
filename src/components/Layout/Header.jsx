import { Link } from 'react-router';
import { StyleSheet } from 'react-look';
import InlineSvg from 'svg-inline-react';

import { colors, fonts, sizes } from '../../constants';

const CONTENT_HEIGHT = 64;
const FULL_HEIGHT    = CONTENT_HEIGHT + sizes.SPACING.NORMAL * 2;

const STYLES = StyleSheet.create({
  root: {
    display: 'flex',
    maxWidth: sizes.MAX_CONTENT_WIDTH + sizes.SPACING.NORMAL * 2,
    margin: '0 auto',
    padding: sizes.SPACING.NORMAL,
  },
  logoLink: {
    display: 'flex',
    color: colors.MONOCHROME.LIGHT,
    textDecoration: 'none',
  },
  icon: {
    height: CONTENT_HEIGHT,
    fill:   colors.PRIMARY,
  },
  logoTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: sizes.SPACING.NORMAL,
    marginRight: sizes.SPACING.NORMAL,
    textTransform: 'uppercase',
  },
  logoTextSpacer: {
    flex: 1,
  },
  boundless: {
    ...fonts.compactHeader((CONTENT_HEIGHT - sizes.SPACING.NORMAL) / 2, 0.466),
    paddingTop: '0.025em',
  },
  exchange: {
    ...fonts.compactHeader((CONTENT_HEIGHT - sizes.SPACING.NORMAL) / 2, 0.575),
    paddingBottom: '0.05em',
  },
  nav: {
    flex: 1,
  },
});

export default function Header({className}) {
  return (
    <header className={`${STYLES.root} ${className}`}>
      <Link to='/' className={STYLES.logoLink}>
        <InlineSvg raw src={require('svg-inline!../../assets/logo.svg')} className={STYLES.icon} />
        <div className={STYLES.logoTextContainer}>
          <span className={STYLES.boundless}>Boundless</span>
          <span className={STYLES.logoTextSpacer}> </span>
          <span className={STYLES.exchange}>Exchange</span>
        </div>
      </Link>
      <nav className={STYLES.navigation}>

      </nav>
    </header>
  );
}

Header.FULL_HEIGHT = FULL_HEIGHT;
