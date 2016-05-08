import * as _ from 'lodash';
import chroma from 'chroma-js';
import look, { StyleSheet } from 'react-look';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { PropTypes } from 'react';

import { animation, colors, fonts, sizes } from '../constants';

import BaseComponent from './BaseComponent';

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
    transition: `
      transform ${animation.DEFAULT},
      background ${animation.DEFAULT},
      border-right-color ${animation.DEFAULT}
    `,
    transform: `translateZ(${sizes.DEPTH * 0.05}px)`,
    transformStyle: 'preserve-3d',
    backgroundColor: colors.DIALOG.BACKGROUND,
    padding: sizes.SPACING.SMALL,
    cursor: 'pointer',
    userSelect: 'none',
    borderRadius: sizes.BORDER_RADIUS,
    'inline=true': {
      padding: `0 ${sizes.SPACING.TINY}px`,
      margin: `0 ${-sizes.SPACING.TINY}px`,
    },
    'navigation=true': {
      borderRadius: 0,
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
      transform: `translateZ(${sizes.DEPTH * 0.95}px)`,
      backgroundColor: colors.ACTIVE,
    },
  },
  contentInner: {
    'inline=false': {
      ...fonts.HEADING[6],
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
