import * as _ from 'lodash';
import { StyleSheet } from 'react-look';
import { PropTypes } from 'react';

import BaseComponent from './BaseComponent';
import Raised from './Raised';
import { colors, sizes } from '../constants';

const STYLES = StyleSheet.create({
  root: {
    position: 'relative',
  },
  shadow: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.DIALOG.SHADOW,
    boxShadow: `0 0 4px 1px ${colors.DIALOG.SHADOW}`,
    opacity: 0.15,
  },
  background: {
    backgroundColor: colors.DIALOG.BACKGROUND,
    padding: sizes.SPACING.NORMAL,
    borderRadius: sizes.BORDER_RADIUS,
  },
});

export default class Layer extends BaseComponent {

  static propTypes = {
    children: PropTypes.node.isRequired,
    depth: PropTypes.number.isRequired,
  };

  static defaultProps = {
    depth: 1,
  };

  render() {
    return (
      <div className={`${STYLES.root} ${this.props.className}`}>
        {this.props.depth > 0 &&
          <div className={STYLES.shadow} />
        }
        <Raised depth={this.props.depth}>
          <div className={STYLES.background}>
            <Raised depth={1}>{this.props.children}</Raised>
          </div>
        </Raised>
      </div>
    );
  }

}
