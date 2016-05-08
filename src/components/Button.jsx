import * as _ from 'lodash';
import chroma from 'chroma-js';
import look, { StyleSheet } from 'react-look';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { PropTypes } from 'react';

import { animation, colors, fonts, sizes } from '../constants';

import BaseComponent from './BaseComponent';
import Raised from './Raised';

const STYLES = StyleSheet.create({
  root: {
    display: 'block',
    position: 'relative',
    transition: `color ${animation.DEFAULT}`,
    transformStyle: 'preserve-3d',
    color: 'inherit',
    textDecoration: 'none',
    'hover=true': {
      color: colors.FOREGROUND,
    },
  },
  shadow: {
    position: 'absolute',
    transform: `translateZ(${sizes.DEPTH * -0.999}px)`,
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
      transform: `translateZ(${sizes.DEPTH * 0.001}px)`,
      opacity: 0.3,
      zIndex: 2,
    },
  },
  content: {
    transition: `
      transform ${animation.DEFAULT},
      background ${animation.DEFAULT},
      border-right-color ${animation.DEFAULT}
    `,
    transform: `translateZ(${sizes.DEPTH * 0.001}px)`,
    transformStyle: 'preserve-3d',
    backgroundColor: colors.DIALOG.BACKGROUND,
    padding: sizes.SPACING.SMALL,
    cursor: 'pointer',
    userSelect: 'none',
    'navigation=true': {
      borderRight: `${sizes.BORDER.THICK}px solid ${chroma(colors.ACCENT).alpha(0).css()}`,
      'active=true': {
        borderRight: `${sizes.BORDER.THICK}px solid ${colors.ACCENT}`,
      },
    },
    'link=true': {
      backgroundColor: 'transparent',
    },
    'highlight=true': {
      backgroundColor: colors.DIALOG.BACKGROUND_HIGHLIGHT,
    },
    'hover=true': {
      transform: `translateZ(${sizes.DEPTH * 0.999}px)`,
      backgroundColor: colors.ACCENT_HIGHLIGHT,
    },
  },
  contentInner: {
    ...fonts.compactHeader(fonts.SIZES.COPY),
  },
});

@connect((_state, _props) => ({}))
@look
export default class Button extends BaseComponent {

  static propTypes = {
    children: PropTypes.node.isRequired,
    depth: PropTypes.number.isRequired,
    highlight: PropTypes.bool,
    link: PropTypes.bool,
    navigation: PropTypes.bool,
  };

  static defaultProps = {
    depth: 1,
  };

  static contextTypes = {
    router: PropTypes.shape({
      isActive: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props, context, ...args) {
    super(props, context, ...args);

    this.state = {
      active: context.router.isActive(props.to),
    };
  }

  componentWillReceiveProps(nextProps) {
    // react-look actively fights react-router's Link for control of className.
    //
    // So, we manage it ourselves instead.
    this.setState({active: this.context.router.isActive(nextProps.to)});
  }

  render() {
    return (
      <Link
        className={STYLES.root}
        onMouseOver={this._onMouseOver}
        onMouseOut={this._onMouseOut}
        to={this.props.to}
        title={this.props.title}
      >
        <div className={STYLES.shadow} />
        <div className={STYLES.content}>
          <div className={STYLES.contentInner}>
            <Raised depth={1}>{this.props.children}</Raised>
          </div>
        </div>
      </Link>
    );
  }

  _onMouseOver = () => {
    this.setState({hover: true});
  }

  _onMouseOut = () => {
    this.setState({hover: false});
  }

}