import { StyleSheet } from 'react-look';

import { BaseComponent } from '../components';
import { Navigation } from '../components/Layout';
import { colors, fonts } from '../constants';

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
  navigation: {
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    transformStyle: 'preserve-3d',
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
        <Navigation className={STYLES.navigation} />
      </div>
    );
  }

  _onMouseMove = event => {
    const html = document.documentElement;
    this._updatePerspective(event.pageX / html.scrollWidth, event.pageY / html.scrollHeight);
  }

  _updatePerspective(x, y) {
    document.documentElement.style.transform = `rotateY(${this._rotate(1 - x)}) rotateX(${this._rotate(y)})`;
  }

  _rotate(value) {
    return `${((1 - value) * ROTATION_MAX * 2) - ROTATION_MAX}deg`;
  }

}
