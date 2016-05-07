import { PropTypes } from 'react';

import { BaseComponent } from '../components';

export default class ArticleCollection extends BaseComponent {

  static propTypes = {
    route: PropTypes.shape({
      articles: PropTypes.instanceOf(Promise).isRequired,
    }).isRequired,
    params: PropTypes.shape({
      article: PropTypes.string.isRequired,
    }).isRequired,
  }

  state = {
    articles: null,
  }

  async componentWillMount() {
    this.setState({articles: await this.props.route.articles});
  }

  render() {
    if (!this.state.articles) return null;
    const Document = this.state.articles[this.props.params.article].default;
    return <Document />;
  }

}
