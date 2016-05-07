import { PropTypes } from 'react';

import BaseComponent from '../BaseComponent';

export default class Heading extends BaseComponent {

  static propTypes = {
    level: PropTypes.oneOf([1, 2, 3, 4, 5]),
  }

  render() {
    // Go with h2+ since we render a h1 for the article title.
    const Component = `h${this.props.level + 1}`;
    return <Component>{this.props.children}</Component>;
  }

}
