import { StyleSheet } from 'react-look';

import BaseComponent from '../BaseComponent';
import { sizes } from '../../constants';

const STYLES = StyleSheet.create({
  root: {
    paddingTop: sizes.SPACING.SMALL,
    paddingBottom: sizes.SPACING.SMALL,
  },
});

export default class ArticleParagraph extends BaseComponent {

  render() {
    return <div {...this.props} className={STYLES.root}>{this.props.children}</div>;
  }

}
