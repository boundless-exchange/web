import look, { StyleSheet } from 'react-look';

import BaseComponent from './BaseComponent';

const STYLES = StyleSheet.create({
  root: {
    ':hover': {
      backgroundColor: 'red',
    },
    // 'a=b': {},
  },
});

@look
export default class Header extends BaseComponent {
  render() {
    return <h1 className={STYLES.root}>Header</h1>;
  }
}
