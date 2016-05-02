import * as _ from 'lodash';
import look, { StyleSheet } from 'react-look';
import { PropTypes } from 'react';

import { sizes } from '../constants';
import BaseComponent from './BaseComponent';

const MAX_DEPTH = 9;

const STYLES = StyleSheet.create({
  root: {
    transformStyle: 'preserve-3d',
    ..._.fromPairs(_.times(MAX_DEPTH, depth => [`depth=${depth + 1}`, {
      transform: `translateZ(${sizes.DEPTH * (depth + 1)}px)`,
    }])),
  },
});

@look
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
      <div className={STYLES.root}>
        {this.props.children}
      </div>
    );
  }

}
