import { StyleSheet } from 'react-look';

import { BaseComponent } from '../components';
import { Navigation } from '../components/Layout';
import { colors, fonts, sizes } from '../constants';

// Maximum # of degrees the page will rotate in a particular direction.
const ROTATION_MAX = 4;

const STYLES = StyleSheet.create({
  html: {
    ...fonts.COPY,
    backgroundColor: colors.BACKGROUND,
    padding: sizes.SPACING.NORMAL,
  },
  root: {
    display: 'table-row',
    width: '100%',
    transformStyle: 'preserve-3d',
    perspective: 50000,
  },
  navigationContainer: {
    display: 'table-cell',
    verticalAlign: 'top',
    padding: sizes.SPACING.NORMAL,
  },
  contentContainer: {
    display: 'table-cell',
    width: '100%',
    position: 'relative',
    verticalAlign: 'top',
    padding: sizes.SPACING.NORMAL,
  },
  navigation: {
    transformStyle: 'preserve-3d',
  },
  contentBackground: {
    backgroundColor: colors.DIALOG.FOREGROUND,
    position: 'absolute',
    top: sizes.SPACING.NORMAL,
    left: sizes.SPACING.NORMAL,
    right: sizes.SPACING.NORMAL,
    bottom: sizes.SPACING.NORMAL,
    borderRadius: sizes.BORDER_RADIUS,
  },
  content: {
    padding: sizes.SPACING.NORMAL,
    position: 'relative',
    zIndex: 1,
  },
});

export default class Layout extends BaseComponent {

  componentWillMount() {
    // As the top level component, we own the page-wide styles, too.
    document.documentElement.classList.add(STYLES.html);
  }

  componentDidMount() {
    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('scroll', this._onScroll);

    this._updateRotation(0.5, 0.5);
    this._updatePerspective();
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('scroll', this._onScroll);
  }

  render() {
    return (
      <div className={STYLES.root} ref={r => this._root = r}>
        <div className={STYLES.navigationContainer}>
          <Navigation className={STYLES.navigation} />
        </div>
        <div className={STYLES.contentContainer}>
          <div className={STYLES.contentBackground} />
          <div className={STYLES.content}>{this.props.children}</div>
        </div>
      </div>
    );
  }

  _onMouseMove = event => {
    const html = document.documentElement;
    this._updateRotation(event.clientX / html.clientWidth, event.clientY / html.clientHeight);
  }

  _onScroll = _event => {
    this._updatePerspective();
  }

  _updateRotation(x, y) {
    this._root.style.transform = `rotateY(${this._rotate(1 - x)}) rotateX(${this._rotate(y)})`;
  }

  _rotate(value) {
    return `${((1 - value) * ROTATION_MAX * 2) - ROTATION_MAX}deg`;
  }

  _updatePerspective() {
    const html = document.documentElement;
    const x = html.clientWidth / 2 + window.scrollX;
    const y = html.clientHeight / 2 + window.scrollY;
    this._root.style.transformOrigin = `${x}px ${y}px`;
  }

}
