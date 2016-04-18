import { StyleSheet } from 'react-look';

import { BaseComponent } from '../components';
import { Header } from '../components/Layout';
import { sizes, styles } from '../constants';

const MAX_CONTENT_WIDTH = 1200;

const STYLES = StyleSheet.create({
  root: {
  },
  html: {
    ...styles.LIGHT_ON_DARK,
  },
  header: {
    ...styles.LIGHT_ON_DARK,
    position: 'fixed',
    height: Header.FULL_HEIGHT,
    top: 0,
    left: 0,
    right: 0,
  },
  contentWrapper: {
    paddingLeft: sizes.SPACING.NORMAL,
    paddingRight: sizes.SPACING.NORMAL,
  },
  content: {
    ...styles.DARK_ON_LIGHT,
    maxWidth: MAX_CONTENT_WIDTH,
    margin: '0 auto',
    paddingLeft: sizes.SPACING.NORMAL,
    paddingRight: sizes.SPACING.NORMAL,
    paddingTop: Header.FULL_HEIGHT + sizes.SPACING.NORMAL,
    paddingBottom: sizes.SPACING.NORMAL * 2,
  },
  footer: {
    ...styles.LIGHT_ON_DARK,
    position: 'fixed',
    height: sizes.SPACING.NORMAL,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default class Layout extends BaseComponent {

  componentWillMount() {
    // As the top level component, we own the page-wide styles, too.
    document.documentElement.classList.add(STYLES.html);
  }

  render() {
    return (
      <div className={STYLES.root}>
        <Header className={STYLES.header} />
        <div className={STYLES.contentWrapper}>
          <div className={STYLES.content}>
            {this.props.children}
          </div>
        </div>
        <div className={STYLES.footer}>
        </div>
      </div>
    );
  }

}
