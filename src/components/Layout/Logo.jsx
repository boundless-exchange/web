import InlineSvg from 'svg-inline-react';
import { Link } from 'react-router';
import { StyleSheet } from 'react-look';

import { BaseComponent } from '..';
import { colors, fonts, sizes } from '../../constants';

// Pre-calculated letter spacing to line up the logo text.
const BOUNDLESS_SPACING = 0.475;
const EXCHANGE_SPACING  = 0.5825;

// Pre-calculated width/height ratio of the icon.
const ICON_ASPECT_RATIO = 1.28;

const HEIGHT     = 48;
const ROW_HEIGHT = (HEIGHT - sizes.SPACING.SMALL) / 2;
const ICON_WIDTH = HEIGHT * ICON_ASPECT_RATIO;

const STYLES = StyleSheet.create({
  root: {
    display: 'block',
    color: colors.DIALOG.FOREGROUND,
    textDecoration: 'none',
    textTransform: 'uppercase',
    paddingLeft: ICON_WIDTH + sizes.SPACING.SMALL,
    position: 'relative',
  },
  icon: {
    fill: colors.ACCENT,
    height: HEIGHT,
    width: HEIGHT * ICON_ASPECT_RATIO,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  boundless: {
    ...fonts.compactHeader(ROW_HEIGHT, BOUNDLESS_SPACING),
    display: 'block',
    marginBottom: sizes.SPACING.SMALL,
    WebkitFontSmoothing: 'antialiased',
  },
  exchange: {
    ...fonts.compactHeader(ROW_HEIGHT, EXCHANGE_SPACING),
    display: 'block',
    WebkitFontSmoothing: 'antialiased',
  },
});

export default class Logo extends BaseComponent {

  static HEIGHT = HEIGHT;

  render() {
    return (
      <Link to='/' className={STYLES.root} title='Boundless Exchange'>
        <div className={STYLES.icon}>
          <InlineSvg raw src={require('svg-inline!../../assets/logo.svg')} />
        </div>
        <span className={STYLES.boundless}>Boundless</span>
        <span className={STYLES.exchange}>Exchange</span>
      </Link>
    );
  }

}
