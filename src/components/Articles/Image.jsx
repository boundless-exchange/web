import { StyleSheet } from 'react-look';

import { colors, sizes } from '../../constants';

import BaseComponent from '../BaseComponent';
import Raised from '../Raised';

const STYLES = StyleSheet.create({
  root: {
    position: 'relative',
  },
  shadow: {
    position: 'absolute',
    transform: `translateZ(${sizes.DEPTH * -0.85}px)`,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.DIALOG.SHADOW,
    boxShadow: `0 0 12px 4px ${colors.DIALOG.SHADOW}`,
    zIndex: 1,
    opacity: 0.3,
  },
  image: {
    display: 'block',
    position: 'relative',
    height: '100%',
    width: '100%',
    zIndex: 10,
  },
});

export default class ArticleImage extends BaseComponent {

  render() {
    const {src: {src, height, width}, ...props} = this.props;
    const style = {
      height: `${height * 0.5}px`,
      width:  `${width * 0.5}px`,
    };
    return (
      <div className={STYLES.root} style={style}>
        <div className={STYLES.shadow} />
        <Raised depth={1}>
          <img {...props} className={STYLES.image} src={src} />
        </Raised>
      </div>
    );
  }

}
