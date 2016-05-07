import { PropTypes } from 'react';
import { StyleSheet } from 'react-look';

import { BaseComponent, Raised } from '../components';
import { Logo } from '../components/Layout';
import { colors, fonts, sizes } from '../constants';

// Maximum # of degrees the page will rotate in a particular direction.
const ROTATION_MAX = 4.5;

const STYLES = StyleSheet.create({
  html: {
    ...fonts.COPY,
    backgroundColor: colors.BACKGROUND,
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
    transformStyle: 'preserve-3d',
    perspective: 50000,
  },
  navigation: {
    marginRight: sizes.SPACING.NORMAL,
  },
  content: {
    flex: 1,
    backgroundColor: colors.DIALOG.FOREGROUND,
    borderRadius: sizes.BORDER_RADIUS,
    padding: sizes.SPACING.NORMAL,
  },
});

export default class Layout extends BaseComponent {

  static propTypes = {
    scene: PropTypes.node.isRequired,
    navigation: PropTypes.node.isRequired,
  }

  componentWillMount() {
    // As the top level component, we own the page-wide styles, too.
    document.documentElement.classList.add(STYLES.html);
    document.body.classList.add(STYLES.body);
    document.getElementById('root').classList.add(STYLES.reactRoot);
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

    // Clean up our mess when hot reloading
    document.documentElement.classList.remove(STYLES.html);
    document.body.classList.remove(STYLES.body);
    document.getElementById('root').classList.remove(STYLES.reactRoot);
  }

  render() {
    return (
      <div className={STYLES.root} ref={r => this._root = r}>
        <div className={STYLES.navigation}>
          <Raised depth={3}>
            <Logo />
            {this.props.navigation}
          </Raised>
        </div>
        <div className={STYLES.content}>
          <Raised depth={1}>
            {this.props.scene}
          </Raised>
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
