import { StyleSheet } from 'react-look';

import { BaseComponent, Button, Raised } from '../components';
import { sizes } from '../constants';

const STYLES = StyleSheet.create({
  root: {
    marginBottom: sizes.SPACING.NORMAL,
  },
  children: {
    marginTop: -sizes.SPACING.TINY / 2,
    paddingLeft: sizes.SPACING.TINY,
    paddingRight: sizes.SPACING.TINY,
  },
});

export default class Section extends BaseComponent {

  render() {
    return (
      <div className={STYLES.root}>
        <Raised depth={1}>
          <Button highlight>{this.props.title}</Button>
        </Raised>
        {this.props.children &&
          <div className={STYLES.children}>
            <Button>{this.props.children}</Button>
          </div>
        }
      </div>
    );
  }

}
