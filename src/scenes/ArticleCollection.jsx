import { PropTypes } from 'react';

import { BaseComponent } from '../components';

export default class ArticleCollection extends BaseComponent {

  static propTypes = {
    route: PropTypes.shape({
      articles: PropTypes.instanceOf(Promise).isRequired,
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
    return <p>{JSON.stringify(this.state.articles)}</p>;
  }

}
