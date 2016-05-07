import { PropTypes } from 'react';

import BaseComponent from '../BaseComponent';

export default class Heading extends BaseComponent {

  static propTypes = {
    level: PropTypes.oneOf([0, 1, 2, 3, 4, 5]).isRequired,
    children: PropTypes.node.isRequired,
  }

  render() {
    // h1 is reserved for the page title.
    const Component = `h${this.props.level + 1}`;
    return <Component>{this.props.children}</Component>;
  }

}
