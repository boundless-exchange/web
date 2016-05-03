import { StyleSheet } from 'react-look';

import { BaseComponent, Layer, Raised } from '..';
import { colors, fonts, sizes } from '../../constants';

import Logo from './Logo';

const STYLES = StyleSheet.create({
  root: {
    color: colors.DIALOG.FOREGROUND,
    padding: sizes.SPACING.NORMAL,
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
        <Raised depth={2}><Logo /></Raised>
        {this._renderSectionTitle('Guide')}
        <Layer depth={-4}>
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
        <Layer depth={-4}>
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
        <Layer depth={-4}>
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
    );
  }

  _renderSectionTitle(title) {
    return (
      <Raised depth={-2}>
        <div className={STYLES.sectionTitle}>{title}</div>
      </Raised>
    );
  }

}
