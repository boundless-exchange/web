import chroma from 'chroma-js';
import { StyleSheet } from 'react-look';

import { BaseComponent } from '..';
import { colors, fonts, sizes, styles } from '../../constants';
import NavigationLink from './NavigationLink';

const STYLES = StyleSheet.create({
  worldBuilder: {
    ...fonts.HEADER.MEDIUM,
    display: 'inline-block',
    color: chroma(colors.MONOCHROME.LIGHT).alpha(0.5).css(),
    padding: sizes.SPACING.SMALL,
  },
});

export default class Navigation extends BaseComponent {

  render() {
    return (
      <div className={this.props.className}>
        <div className={STYLES.worldBuilder}>World Builder:</div>
        <NavigationLink path='/world-builder/guide'>Guide</NavigationLink>
        <NavigationLink path='/world-builder/reference'>Reference</NavigationLink>
        <NavigationLink path='/world-builder/techniques'>Techniques</NavigationLink>
      </div>
    );
  }

}
