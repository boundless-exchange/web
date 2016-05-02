import { StyleSheet } from 'react-look';

import { BaseComponent, Layer, Raised } from '..';
import { colors, fonts, sizes } from '../../constants';

import Logo from './Logo';

const STYLES = StyleSheet.create({
  root: {
    color: colors.DIALOG.FOREGROUND,
    padding: sizes.SPACING.NORMAL,
  },
  scrollContainer: {
    position: 'absolute',
    top: Logo.HEIGHT + sizes.SPACING.NORMAL * 2,
    left: 0,
    bottom: 0,
    right: 0,
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingLeft: sizes.SPACING.NORMAL,
    paddingRight: sizes.SPACING.NORMAL,
    paddingBottom: sizes.SPACING.NORMAL,
  },
  sectionTitle: {
    ...fonts.HEADER.MEDIUM,
    marginTop: sizes.SPACING.NORMAL,
    marginBottom: sizes.SPACING.NORMAL,
    textTransform: 'uppercase',
  },
});

export default class Navigation extends BaseComponent {

  render() {
    return (
      <div className={`${STYLES.root} ${this.props.className}`}>
        <Raised depth={4}><Logo /></Raised>
        <div className={STYLES.scrollContainer}>
          {this._renderSectionTitle('Guide')}
          <Layer depth={0}>
            World Builder<br />
            World Builder<br />
            World Builder<br />
            World Builder<br />
            World Builder<br />
            World Builder<br />
            World Builder<br />
            World Builder<br />
            World Builder<br />
            World Builder<br />
          </Layer>
          {this._renderSectionTitle('Reference')}
          <Layer depth={0}>
            World Builder<br />
            World Builder<br />
            World Builder<br />
            World Builder<br />
            World Builder<br />
            World Builder<br />
            World Builder<br />
            World Builder<br />
            World Builder<br />
            World Builder<br />
          </Layer>
          {this._renderSectionTitle('Techniques')}
          <Layer depth={0}>
            World Builder<br />
            World Builder<br />
            World Builder<br />
            World Builder<br />
            World Builder<br />
            World Builder<br />
            World Builder<br />
            World Builder<br />
            World Builder<br />
            World Builder<br />
          </Layer>
        </div>
      </div>
    );
  }

  _renderSectionTitle(title) {
    return (
      <Raised depth={2}>
        <div className={STYLES.sectionTitle}>{title}</div>
      </Raised>
    );
  }

}
