import BaseComponent from '../BaseComponent';

export default class ArticleImage extends BaseComponent {

  render() {
    const {src: {src, height, width}, ...props} = this.props;
    const style = {
      height: `${height * 0.5}px`,
      width:  `${width * 0.5}px`,
    };
    return <img {...props} src={src} style={style} />;
  }

}
