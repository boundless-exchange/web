import { StyleSheet } from 'react-look';

import { BaseComponent, Raised } from '../components';
import { sizes } from '../constants';

const STYLES = StyleSheet.create({
  root: {
    marginBottom: sizes.SPACING.NORMAL,
  },
  children: {
    // marginTop: -sizes.SPACING.TINY / 2,
    padding: sizes.SPACING.TINY,
    paddingTop: 0,
  },
});

export default class Section extends BaseComponent {

  render() {
    return (
      <div className={STYLES.root}>
        <Raised depth={1}>{this.props.title}</Raised>
        {this.props.children &&
          <div className={STYLES.children}>{this.props.children}</div>
        }
      </div>
    );
  }

}
