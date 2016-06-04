import { PropTypes } from 'react';
import { StyleSheet } from 'react-look';

import BaseComponent from './BaseComponent';
import { colors, fonts, sizes } from '../constants';

const STYLES = StyleSheet.create({
  root: {
    ...fonts.ASIDE,
    margin: -sizes.SPACING.NORMAL / 2,
    padding: sizes.SPACING.NORMAL / 2,
    border: `${sizes.BORDER.NORMAL}px solid ${colors.NOTICE.FOREGROUND}`,
    borderRadius: sizes.BORDER_RADIUS,
    color: colors.NOTICE.FOREGROUND,
    backgroundColor: colors.NOTICE.BACKGROUND,
  },
  title: {
    fontWeight: 'bold',
    paddingBottom: sizes.SPACING.SMALL,
  },
});

const TYPES = {
  stub: {
    title: `This article is incomplete`,
    body: `We could use your help!  If you have ideas, or would like to fill in some portion of the article, feel free to contribute them.`, // eslint-disable-line max-len
  },
};

export default class Notice extends BaseComponent {

  static propTypes = {
    type: PropTypes.oneOf(['stub']),
  }

  render() {
    const type = TYPES[this.props.type];
    return (
      <div className={STYLES.root}>
        <div className={STYLES.title}>{type.title}</div>
        <div>{type.body}</div>
      </div>
    );
  }

}
