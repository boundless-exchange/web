import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { PropTypes } from 'react';
import chroma from 'chroma-js';
import look, { StyleSheet } from 'react-look';

import { BaseComponent } from '..';
import { colors, fonts, sizes, styles } from '../../constants';

const FONT   = fonts.HEADER.MEDIUM;
const HEIGHT = (FONT.fontSize * FONT.lineHeight) + sizes.SPACING.SMALL * 2;

const CURVE = `ease-in-out 225ms`;

const STYLES = StyleSheet.create({
  root: {
    ...styles.LIGHT_ON_DARK,
    ...FONT,
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'bottom',
    height: HEIGHT,
    overflow: 'hidden',
    padding: sizes.SPACING.SMALL,
    // marginLeft: sizes.SPACING.NORMAL,
    textDecoration: 'none',
  },
  highlight: {
    display: 'block',
    position: 'absolute',
    transform: `translateY(${HEIGHT}px)`,
    transition: `transform ${CURVE}, background-color ${CURVE}`,
    top: 0,
    left: 0,
    right: 0,
    height: HEIGHT,
    overflow: 'hidden',
    borderTopLeftRadius: sizes.BORDER.THICK,
    borderTopRightRadius: sizes.BORDER.THICK,
    backgroundColor: chroma(colors.MONOCHROME.LIGHT).mix(colors.MONOCHROME.DARK, 0.5).css(),
    'highlighted=true': {
      transform: `translateY(0)`,
    },
    'active=true': {
      transform: `translateY(0)`,
      backgroundColor: colors.MONOCHROME.LIGHT,
    },
  },
  highlightContent: {
    ...FONT,
    display: 'block',
    position: 'absolute',
    transform: `translateY(-${HEIGHT}px)`,
    transition: `transform ${CURVE}`,
    padding: sizes.SPACING.SMALL,
    height: HEIGHT,
    color: colors.MONOCHROME.DARK,
    'highlighted=true': {
      transform: `translateY(0)`,
    },
    'active=true': {
      transform: `translateY(0)`,
    },
  },
});

@connect(state => ({
  location: state.routing.locationBeforeTransitions,
}))
@look
export default class NavigationLink extends BaseComponent {

  static propTypes = {
    path: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }

  state = {
    highlighted: false,
    active: false,
  }

  componentWillMount() {
    this._updateActive(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._updateActive(nextProps);
  }

  render() {
    return (
      <IndexLink
        to={this.props.path}
        className={STYLES.root}
        activeClassName={STYLES.active}
        onMouseOver={this._onMouseOver}
        onMouseOut={this._onMouseOut}
      >
        {this.props.children}
        <span className={STYLES.highlight}>
          <span className={STYLES.highlightContent}>
            {this.props.children}
          </span>
        </span>
      </IndexLink>
    );
  }

  _onMouseOver = () => {
    this.setState({highlighted: true});
  }

  _onMouseOut = () => {
    this.setState({highlighted: false});
  }

  _updateActive(props) {
    this.setState({
      active: props.location.pathname === props.path,
    });
  }

}
