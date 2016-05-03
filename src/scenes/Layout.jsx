import { StyleSheet } from 'react-look';

import { BaseComponent, Raised } from '../components';
import { Navigation } from '../components/Layout';
import { colors, fonts, sizes } from '../constants';

// Maximum # of degrees the page will rotate in a particular direction.
const ROTATION_MAX = 5;

const STYLES = StyleSheet.create({
  html: {
    ...fonts.COPY,
    backgroundColor: colors.BACKGROUND,
    perspective: 15000,
    perspectiveOrigin: '50vh 50vh',
    height: '100%',
    transformStyle: 'preserve-3d',
  },
  root: {
    display: 'table-row',
    width: '100%',
  },
  navigationContainer: {
    display: 'table-cell',
  },
  contentContainer: {
    display: 'table-cell',
    width: '100%',
    position: 'relative',
  },
  navigation: {
    transformStyle: 'preserve-3d',
  },
  content: {
    backgroundColor: colors.DIALOG.FOREGROUND,
    position: 'absolute',
    top: sizes.SPACING.NORMAL,
    left: sizes.SPACING.NORMAL,
    right: sizes.SPACING.NORMAL,
    bottom: sizes.SPACING.NORMAL,
    borderRadius: sizes.BORDER_RADIUS,
    padding: sizes.SPACING.NORMAL,
  },
});

export default class Layout extends BaseComponent {

  componentWillMount() {
    document.addEventListener('mousemove', this._onMouseMove);

    // As the top level component, we own the page-wide styles, too.
    document.documentElement.classList.add(STYLES.html);
    this._updatePerspective(0.5, 0.5);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this._onMouseMove);
  }

  render() {
    return (
      <div className={STYLES.root}>
        <div className={STYLES.navigationContainer}>
          <Navigation className={STYLES.navigation} />
        </div>
        <div className={STYLES.contentContainer}>
          <div className={STYLES.content}>
            <Raised>asdf</Raised>
          </div>
        </div>
      </div>
    );
  }

  _onMouseMove = event => {
    const html = document.documentElement;
    this._updatePerspective(event.clientX / html.clientWidth, event.clientY / html.clientHeight);
  }

  _updatePerspective(x, y) {
    document.documentElement.style.transform = `rotateY(${this._rotate(1 - x)}) rotateX(${this._rotate(y)})`;
  }

  _rotate(value) {
    return `${((1 - value) * ROTATION_MAX * 2) - ROTATION_MAX}deg`;
  }

}
