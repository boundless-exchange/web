import * as _ from 'lodash';
import look, { StyleSheet } from 'react-look';
import { PropTypes } from 'react';

import { animation, colors, fonts, sizes } from '../constants';

import BaseComponent from './BaseComponent';
import Raised from './Raised';

const STYLES = StyleSheet.create({
  root: {
    position: 'relative',
    transformStyle: 'preserve-3d',
  },
  shadow: {
    position: 'absolute',
    transform: `translateZ(${sizes.DEPTH * 0.05}px)`,
    transition: `opacity ${animation.DEFAULT}`,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.DIALOG.SHADOW,
    boxShadow: `0 0 3px 2px ${colors.DIALOG.SHADOW}`,
    zIndex: 1,
    opacity: 0.15,
    'hover=true': {
      transform: `translateZ(${sizes.DEPTH * 1.05}px)`,
      opacity: 0.3,
      zIndex: 2,
    },
  },
  content: {
    ...fonts.compactHeader(fonts.SIZES.COPY),
    transition: `transform ${animation.DEFAULT}, background ${animation.DEFAULT}`,
    transform: `translateZ(${sizes.DEPTH}px)`,
    transformStyle: 'preserve-3d',
    backgroundColor: colors.DIALOG.BACKGROUND,
    padding: sizes.SPACING.SMALL,
    cursor: 'pointer',
    userSelect: 'none',
    'highlight=true': {
      backgroundColor: colors.DIALOG.BACKGROUND_HIGHLIGHT,
    },
    'hover=true': {
      transform: `translateZ(${sizes.DEPTH * 1.95}px)`,
      backgroundColor: colors.ACCENT_HIGHLIGHT,
    },
  },
});

@look
export default class Button extends BaseComponent {

  static propTypes = {
    children: PropTypes.node.isRequired,
    depth: PropTypes.number.isRequired,
  };

  static defaultProps = {
    depth: 1,
  };

  render() {
    return (
      <div className={STYLES.root} onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut}>
        <div className={STYLES.shadow} />
        <div className={STYLES.content}>
          <Raised depth={1}>{this.props.children}</Raised>
        </div>
      </div>
    );
  }

  _onMouseOver = () => {
    this.setState({hover: true});
  }

  _onMouseOut = () => {
    this.setState({hover: false});
  }

}
