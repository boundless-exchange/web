import { Animatable, AnimationGroup } from 'react-web-animation';
import { Link } from 'react-router';
import bowser from 'bowser';
import { StyleSheet } from 'react-look';
import InlineSvg from 'svg-inline-react';

import { BaseComponent } from '..';
import { colors, fonts, sizes } from '../../constants';
import Navigation from './Navigation';

// Pre-calculated letter spacing to line up the logo text.
const BOUNDLESS_SPACING = 0.475;
const EXCHANGE_SPACING  = 0.5825;

// 'cause WebKit can only handle integer line heights.
const SAFARI_FUDGE = bowser.safari ? 0.6 : 0;

// Pre-calculated width/height ratio of the icon.
const ICON_ASPECT_RATIO = 1.25;
// Pre-calculated width/height ratio of "BOUNDLESS" at max letter spacing.
const ROW_ASPECT_RATIO = 11.9318681319;

const CONTENT_HEIGHT  = 64;
const FULL_HEIGHT     = CONTENT_HEIGHT + sizes.SPACING.NORMAL * 2;
const ROW_HEIGHT      = (CONTENT_HEIGHT - sizes.SPACING.NORMAL) / 2;
const MAX_SCROLL      = CONTENT_HEIGHT - ROW_HEIGHT;
const ROW_FULL_WIDTH  = ROW_HEIGHT * ROW_ASPECT_RATIO;
const ICON_FULL_WIDTH = CONTENT_HEIGHT * ICON_ASPECT_RATIO;
const LOGO_FULL_WIDTH = ICON_FULL_WIDTH + sizes.SPACING.NORMAL + ROW_FULL_WIDTH;

const STYLES = StyleSheet.create({
  root: {
    maxWidth: sizes.MAX_CONTENT_WIDTH + sizes.SPACING.NORMAL * 2,
    margin: '0 auto',
    padding: sizes.SPACING.NORMAL,
  },
  logoLink: {
    display: 'block',
    position: 'relative',
    color: colors.MONOCHROME.LIGHT,
    textDecoration: 'none',
    width: LOGO_FULL_WIDTH,
    margin: -sizes.SPACING.NORMAL,
    padding: sizes.SPACING.NORMAL,
  },
  icon: {
    transformOrigin: 'left bottom',
    height: CONTENT_HEIGHT,
    width: ICON_FULL_WIDTH,
    fill: colors.PRIMARY,
  },
  boundless: {
    ...fonts.compactHeader(ROW_HEIGHT, BOUNDLESS_SPACING),
    position: 'absolute',
    textTransform: 'uppercase',
  },
  exchange: {
    ...fonts.compactHeader(ROW_HEIGHT, EXCHANGE_SPACING),
    position: 'absolute',
    textTransform: 'uppercase',
    bottom: sizes.SPACING.NORMAL,
    right: sizes.SPACING.NORMAL,
  },
  navigation: {
    position: 'absolute',
    left: LOGO_FULL_WIDTH + sizes.SPACING.NORMAL,
    bottom: 0,
  },
});

// Doesn't matter; just pick something with enough granularity.
const SCROLL_TRANSITION_DURATION = 10000;

const TIMINGS = {
  linear: {
    duration: SCROLL_TRANSITION_DURATION,
    easing: 'linear',
    fill: 'forwards',
  },
  easeInOut: {
    duration: SCROLL_TRANSITION_DURATION,
    easing: 'ease-in-out',
    fill: 'forwards',
  },
};

const KEYFRAMES = {
  root: [
    {offset: 0, transform: 'translateY(0)'},
    {offset: 1, transform: `translateY(${-MAX_SCROLL}px)`},
  ],
  icon: [
    {offset: 0, transform: 'scale(1)'},
    {offset: 1, transform: `scale(${(CONTENT_HEIGHT - MAX_SCROLL) / CONTENT_HEIGHT})`},
  ],
  boundless: [
    {
      offset: 0,
      left: `${ICON_FULL_WIDTH + sizes.SPACING.NORMAL * 2}px`,
      bottom: `${ROW_HEIGHT + sizes.SPACING.NORMAL * 2}px`,
      transform: 'translateY(0)',
      letterSpacing: `${BOUNDLESS_SPACING}em`,
    },
    {
      offset: 1,
      left: `${(ROW_HEIGHT * ICON_ASPECT_RATIO) + sizes.SPACING.NORMAL * 2}px`,
      bottom: `${sizes.SPACING.NORMAL}px`,
      transform: 'translateY(-0.035em)',
      letterSpacing: '0.025em',
    },
  ],
  exchange: [
    {
      offset: 0,
      letterSpacing: `${EXCHANGE_SPACING}em`,
      transform: `translate(-${SAFARI_FUDGE}em, -0.075em)`,
    },
    {
      offset: 1,
      letterSpacing: '0.025em',
      transform: `translate(-${EXCHANGE_SPACING}em, -0.035em)`,
    },
  ],
};

export default class Header extends BaseComponent {

  static FULL_HEIGHT = FULL_HEIGHT;

  state = {
    transitionDuration: 0,
  }

  componentWillMount() {
    this._updateTransitionDuration();
  }

  componentDidMount() {
    window.addEventListener('scroll', this._onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onScroll);
  }

  render() {
    return (
      <AnimationGroup playState='paused' currentTime={this.state.transitionDuration}>
        <Animatable timing={TIMINGS.linear} keyframes={KEYFRAMES.root}>
          <header className={`${STYLES.root} ${this.props.className}`}>
            <Link to='/' className={STYLES.logoLink} title='Boundless Exchange'>
              {this._renderLogo()}
            </Link>
            <Navigation className={STYLES.navigation} />
          </header>
        </Animatable>
      </AnimationGroup>
    );
  }

  _renderLogo() {
    return (
      <AnimationGroup playState='paused' currentTime={this.state.transitionDuration}>
        <Animatable timing={TIMINGS.linear} keyframes={KEYFRAMES.icon}>
          <div className={STYLES.icon}>
            <InlineSvg raw src={require('svg-inline!../../assets/logo.svg')} />
          </div>
        </Animatable>
        <Animatable timing={TIMINGS.linear} keyframes={KEYFRAMES.boundless}>
          <span className={STYLES.boundless}>Boundless</span>
        </Animatable>
        <Animatable timing={TIMINGS.linear} keyframes={KEYFRAMES.exchange}>
          <span className={STYLES.exchange}>Exchange</span>
        </Animatable>
      </AnimationGroup>
    );
  }

  _onScroll = () => {
    this._updateTransitionDuration();
  }

  _updateTransitionDuration() {
    const scrollOffset = Math.max(0, Math.min(MAX_SCROLL, window.scrollY));
    const transitionDuration = (scrollOffset / MAX_SCROLL) * SCROLL_TRANSITION_DURATION;
    this.setState({transitionDuration});
  }

}
