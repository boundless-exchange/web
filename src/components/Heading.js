import { PropTypes } from 'react';
import look, { StyleSheet } from 'react-look';

import BaseComponent from './BaseComponent';
import { fonts } from '../constants';

const STYLES = StyleSheet.create({
  root: {
    margin: 0,
    lineHeight: 0,
  },
  content: {
    'level=1': {
      ...fonts.HEADING[1],
    },
    'level=2': {
      ...fonts.HEADING[2],
    },
    'level=3': {
      ...fonts.HEADING[3],
    },
    'level=4': {
      ...fonts.HEADING[4],
    },
    'level=5': {
      ...fonts.HEADING[5],
    },
    'level=6': {
      ...fonts.HEADING[6],
    },
  },
});

@look
export default class Heading extends BaseComponent {

  static propTypes = {
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
    children: PropTypes.node.isRequired,
  }

  render() {
    const Component = `h${this.props.level}`;
    return (
      <Component className={STYLES.root}>
        <span className={STYLES.content}>
          {this.props.children}
        </span>
      </Component>
    );
  }

}
