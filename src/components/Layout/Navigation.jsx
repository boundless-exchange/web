import { StyleSheet } from 'react-look';

import { BaseComponent } from '..';
import NavigationLink from './NavigationLink';

const STYLES = StyleSheet.create({
});

export default class Navigation extends BaseComponent {

  render() {
    return (
      <div className={`${STYLES.root} ${this.props.className}`}>
        <NavigationLink path='/world-builder/guide'>Guide</NavigationLink>
        <NavigationLink path='/world-builder/reference'>Reference</NavigationLink>
        <NavigationLink path='/world-builder/techniques'>Techniques</NavigationLink>
      </div>
    );
  }

}
