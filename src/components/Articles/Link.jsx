import BaseComponent from '../BaseComponent';
import Button from '../Button';

export default class ArticleLink extends BaseComponent {

  render() {
    return <Button inline link to={this.props.href}>{this.props.children}</Button>;
  }

}
