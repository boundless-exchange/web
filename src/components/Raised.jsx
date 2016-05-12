import * as _ from 'lodash';
import look, { StyleSheet } from 'react-look';
import { PropTypes } from 'react';

import { sizes } from '../constants';
import BaseComponent from './BaseComponent';

const MAX_DEPTH = 9;

const STYLES = StyleSheet.create({
  root: {
    position: 'relative',
    transformStyle: 'preserve-3d',
    ..._.fromPairs(_.times(MAX_DEPTH, depth => [`depth=${depth - MAX_DEPTH}`, {
      transform: `translateZ(${sizes.DEPTH * (depth - MAX_DEPTH)}px)`,
      zIndex: depth + 1,
    }])),
    ..._.fromPairs(_.times(MAX_DEPTH, depth => [`depth=${depth + 1}`, {
      transform: `translateZ(${sizes.DEPTH * (depth + 1)}px)`,
      zIndex: depth + 1 + MAX_DEPTH,
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
    className: '',
  };

  render() {
    return (
      <div className={`${STYLES.root} ${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }

}
