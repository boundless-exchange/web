import * as _ from 'lodash';
import chroma from 'chroma-js';
import look, { StyleSheet } from 'react-look';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { PropTypes } from 'react';

import { animation, colors, fonts, sizes } from '../constants';

import BaseComponent from './BaseComponent';

const SIDE_SHADOW = 0.4;
const SHADOWED = {
  ACCENT: chroma(colors.ACCENT).darken(SIDE_SHADOW).css(),
  ACTIVE: chroma(colors.ACTIVE).darken(SIDE_SHADOW).css(),
  DIALOG_BACKGROUND: chroma(colors.DIALOG.BACKGROUND).darken(SIDE_SHADOW).css(),
  DIALOG_BACKGROUND_HIGHLIGHT: chroma(colors.DIALOG.BACKGROUND_HIGHLIGHT).darken(SIDE_SHADOW).css(),
};

const STYLES = StyleSheet.create({
  root: {
    display: 'block',
    position: 'relative',
    transition: `color ${animation.DEFAULT}`,
    transformStyle: 'preserve-3d',
    color: 'inherit',
    textDecoration: 'none',
    'link=true': {
      color: colors.ACTIVE,
    },
    'inline=true': {
      display: 'inline-block',
    },
    'hover=true': {
      color: colors.FOREGROUND,
    },
  },
  shadow: {
    position: 'absolute',
    transform: `translateZ(${sizes.DEPTH * 0.15}px)`,
    transition: `opacity ${animation.DEFAULT}`,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.DIALOG.SHADOW,
    boxShadow: `0 0 4px 1px ${colors.DIALOG.SHADOW}`,
    zIndex: 1,
    opacity: 0.0,
    pointerEvents: 'none',
    'inline=true': {
      left: -sizes.SPACING.TINY,
      right: -sizes.SPACING.TINY,
    },
    'shadowDepth=1': {
      transform: `translateZ(${sizes.DEPTH * -0.85}px)`,
      opacity: 0.15,
    },
    'hover=true': {
      opacity: 0.3,
      zIndex: 2,
    },
  },
  content: {
    transition: `transform ${animation.DEFAULT}`,
    transform: `translateZ(${sizes.DEPTH * 0.05}px)`,
    padding: sizes.SPACING.SMALL,
    cursor: 'pointer',
    userSelect: 'none',
    zIndex: 10,
    'inline=true': {
      padding: `0 ${sizes.SPACING.TINY}px`,
      margin: `0 ${-sizes.SPACING.TINY}px`,
    },
    'hover=true': {
      transform: `translateZ(${sizes.DEPTH * 1.95}px)`,
    },
  },
  contentInner: {
    transform: `translateZ(${sizes.DEPTH * 0.05}px)`,
    'inline=false': {
      ...fonts.HEADING[6],
    },
  },
  contentBackground: {
    transition: `background ${animation.DEFAULT}, border-right-color ${animation.DEFAULT}`,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.DIALOG.BACKGROUND,
    'navigation=true': {
      borderRight: `${sizes.BORDER.THICK}px solid ${chroma(colors.ACTIVE).alpha(0).css()}`,
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
      backgroundColor: colors.ACTIVE,
    },
  },
  side: {
    opacity: 0.0,
    backgroundColor: SHADOWED.ACTIVE,
    'navigation=true': {
      opacity: 1.0,
      backgroundColor: SHADOWED.DIALOG_BACKGROUND,
      'highlight=true': {
        backgroundColor: SHADOWED.DIALOG_BACKGROUND_HIGHLIGHT,
      },
    },
    'hover=true': {
      opacity: 1.0,
      backgroundColor: SHADOWED.ACTIVE,
    },
  },
  bottomSide: {
    transition: `background ${animation.DEFAULT}, opacity ${animation.DEFAULT}, border ${animation.DEFAULT}`,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: sizes.DEPTH,
    transformOrigin: 'bottom center',
    transform: 'rotateX(90deg)',
    'navigation=true': {
      borderRight: `${sizes.BORDER.THICK}px solid ${chroma(SHADOWED.ACCENT).alpha(0).css()}`,
      'active=true': {
        borderRight: `${sizes.BORDER.THICK}px solid ${SHADOWED.ACCENT}`,
      },
    },
  },
  topSide: {
    transition: `background ${animation.DEFAULT}, opacity ${animation.DEFAULT}, border ${animation.DEFAULT}`,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: sizes.DEPTH,
    transformOrigin: 'top center',
    transform: 'rotateX(-90deg)',
    'navigation=true': {
      borderRight: `${sizes.BORDER.THICK}px solid ${chroma(SHADOWED.ACCENT).alpha(0).css()}`,
      'active=true': {
        borderRight: `${sizes.BORDER.THICK}px solid ${SHADOWED.ACCENT}`,
      },
    },
  },
  leftSide: {
    transition: `background ${animation.DEFAULT}, opacity ${animation.DEFAULT}`,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: sizes.DEPTH,
    transformOrigin: 'center left',
    transform: 'rotateY(90deg)',
  },
  rightSide: {
    transition: `background ${animation.DEFAULT}, opacity ${animation.DEFAULT}`,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: sizes.DEPTH,
    transformOrigin: 'center right',
    transform: 'rotateY(-90deg)',
    'active=true': {
      backgroundColor: `${SHADOWED.ACCENT} !important`,
    },
  },
});

@connect((_state, _props) => ({}))
@look
export default class Button extends BaseComponent {

  static propTypes = {
    children: PropTypes.node.isRequired,
    depth: PropTypes.number.isRequired,
    shadowDepth: PropTypes.number,
    highlight: PropTypes.bool,
    link: PropTypes.bool,
    inline: PropTypes.bool,
    navigation: PropTypes.bool,
  };

  static defaultProps = {
    depth: 1,
    inline: false,
  };

  static contextTypes = {
    router: PropTypes.shape({
      isActive: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props, context, ...args) {
    super(props, context, ...args);

    this.state = {
      active: this._isActive(props.to, context.router),
    };
  }

  componentWillReceiveProps(nextProps) {
    // react-look actively fights react-router's Link for control of className.
    //
    // So, we manage it ourselves instead.
    this.setState({active: this._isActive(nextProps.to)});
  }

  render() {
    const commonProps = {
      className: STYLES.root,
      onMouseOver: this._onMouseOver,
      onMouseOut: this._onMouseOut,
      title: this.props.title,
    };

    if (this._isExternal()) {
      return <a {...commonProps} target='_blank' href={this.props.to}>{this._renderContent()}</a>;
    } else {
      return <Link {...commonProps} to={this.props.to}>{this._renderContent()}</Link>;
    }
  }

  _renderContent() {
    return [
      <div key='shadow' className={STYLES.shadow} />,
      <div key='content' className={STYLES.content}>
        <div className={`${STYLES.side} ${STYLES.topSide}`} />
        <div className={`${STYLES.side} ${STYLES.rightSide}`} />
        <div className={`${STYLES.side} ${STYLES.bottomSide}`} />
        <div className={`${STYLES.side} ${STYLES.leftSide}`} />
        <div className={STYLES.contentBackground} />
        <div className={STYLES.contentInner}>{this.props.children}</div>
      </div>,
    ];
  }

  _onMouseOver = () => {
    this.setState({hover: true});
  }

  _onMouseOut = () => {
    this.setState({hover: false});
  }

  _isActive(url, router = this.context.router) {
    if (this._isExternal(url)) {
      return false;
    } else {
      return router.isActive(url);
    }
  }

  _isExternal(url = this.props.to) {
    return url.match(/^[a-z]+:\/\//);
  }

}
