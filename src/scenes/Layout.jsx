import { PropTypes } from 'react';
import { StyleSheet } from 'react-look';

import { BaseComponent, Raised } from '../components';
import { Logo } from '../components/Layout';
import { colors, fonts, sizes } from '../constants';

// Maximum # of degrees the page will rotate in a particular direction.
const ROTATION_MAX = 4.5;
const DEBUG_ROTATION_MAX = 90;

const STYLES = StyleSheet.create({
  html: {
    ...fonts.COPY,
    backgroundColor: colors.BACKGROUND,
    color: colors.FOREGROUND,
    padding: sizes.SPACING.NORMAL,
    height: '100%',
  },
  body: {
    height: '100%',
  },
  reactRoot: {
    height: '100%',
  },
  root: {
    display: 'flex',
    width: '100%',
    minHeight: '100%',
    perspective: 2000,
  },
  navigationContent: {
    WebkitFontSmoothing: 'antialiased',
  },
  navigation: {
    marginRight: sizes.SPACING.NORMAL,
  },
  logo: {
    // Really, it should be normal padding bottom; zero left, but we're cheating
    // the default perspective here.
    marginBottom: sizes.SPACING.SMALL,
    paddingLeft: sizes.SPACING.SMALL,
  },
  content: {
    flex: 1,
    backgroundColor: colors.DIALOG.FOREGROUND,
    color: colors.BACKGROUND,
    borderRadius: sizes.BORDER_RADIUS,
  },
});

StyleSheet.addCSS({
  '#root div': {
    transformStyle: 'preserve-3d',
  },
  '::selection': {
    backgroundColor: colors.ACTIVE_HIGHLIGHT,
    color: colors.FOREGROUND,
  },
});

export default class Layout extends BaseComponent {

  static propTypes = {
    scene: PropTypes.node.isRequired,
    navigation: PropTypes.node.isRequired,
  }

  _rotationMax = ROTATION_MAX;

  componentWillMount() {
    // As the top level component, we own the page-wide styles, too.
    document.documentElement.classList.add(STYLES.html);
    document.body.classList.add(STYLES.body);
    document.getElementById('root').classList.add(STYLES.reactRoot);
  }

  componentDidMount() {
    window.addEventListener('resize', this._onResize);
    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('scroll', this._onScroll);
    document.addEventListener('keydown', this._onKeyDown);
    document.addEventListener('keyup', this._onKeyDown);

    this._updateRotation(0.5, 0.5);
    this._updatePerspective();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._onResize);
    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('scroll', this._onScroll);
    document.removeEventListener('keydown', this._onKeyDown);
    document.removeEventListener('keyup', this._onKeyDown);

    // Clean up our mess when hot reloading
    document.documentElement.classList.remove(STYLES.html);
    document.body.classList.remove(STYLES.body);
    document.getElementById('root').classList.remove(STYLES.reactRoot);
  }

  render() {
    return (
      <div className={STYLES.root} ref={r => this._root = r}>
        <div className={STYLES.navigation}>
          <Raised depth={3} className={STYLES.logo}>
            <Logo />
          </Raised>
          <div className={STYLES.navigationContent}>
            {this.props.navigation}
          </div>
        </div>
        <Raised depth={2} className={STYLES.content}>
          {this.props.scene}
        </Raised>
      </div>
    );
  }

  _onResize = _event => {
    this._updatePerspective();
  }

  _onMouseMove = event => {
    const html = document.documentElement;
    this._updateRotation(event.clientX / html.clientWidth, event.clientY / html.clientHeight);
  }

  _onScroll = _event => {
    this._updatePerspective();
  }

  _onKeyDown = event => {
    const shouldDebug = event.altKey && event.shiftKey;
    this._setRotationMax(shouldDebug ? DEBUG_ROTATION_MAX : ROTATION_MAX);
  }

  _onKeyUp = _event => {
    this._setRotationMax(ROTATION_MAX);
  }

  _setRotationMax(newMax) {
    if (this._rotationMax === newMax) return;
    this._rotationMax = newMax;
    this._updateRotation();
  }

  _updateRotation(x = this._rotationX, y = this._rotationY) {
    this._rotationX = x;
    this._rotationY = y;
    this._root.style.transform = `rotateY(${this._rotate(1 - x)}) rotateX(${this._rotate(y)})`;
  }

  _rotate(value) {
    return `${((1 - value) * this._rotationMax * 2) - this._rotationMax}deg`;
  }

  _updatePerspective() {
    const html = document.documentElement;
    const x = html.clientWidth / 2 + window.scrollX;
    const y = html.clientHeight / 2 + window.scrollY;
    this._root.style.transformOrigin = `${x}px ${y}px ${sizes.DEPTH * 2}px`;
    this._root.style.perspectiveOrigin = `${x}px ${y}px`;
  }

}
