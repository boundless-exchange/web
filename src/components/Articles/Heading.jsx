import { StyleSheet } from 'react-look';
import { PropTypes } from 'react';

import BaseComponent from '../BaseComponent';
import Heading from '../Heading';
import { sizes } from '../../constants';

const STYLES = StyleSheet.create({
  root: {
    marginTop: sizes.SPACING.NORMAL * 2,
    marginBottom: sizes.SPACING.NORMAL,
  },
});

export default class ArticleHeading extends BaseComponent {

  static propTypes = {
    level: PropTypes.oneOf([1, 2, 3, 4, 5]).isRequired,
    children: PropTypes.node.isRequired,
  }

  render() {
    // Level 1 is reserved for page titles.
    return (
      <Heading level={this.props.level + 1} className={STYLES.root}>
        {this.props.children}
      </Heading>
    );
  }

}
