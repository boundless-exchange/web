import { StyleSheet } from 'react-look';

import BaseComponent from '../BaseComponent';

const STYLES = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default class ArticleCenter extends BaseComponent {

  render() {
    return <div className={STYLES.root}>{this.props.children}</div>;
  }

}
