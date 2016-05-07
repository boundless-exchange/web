import * as _ from 'lodash';
import { connect } from 'react-redux';
import { PropTypes } from 'react';

import { BaseComponent } from '../components';
import { Heading } from '../components/Articles';
import * as interactions from '../interactions';

import NotFound from './NotFound';

@connect((state, props) => {
  const category = props.route.category;
  const articleKey = props.params.article;
  return {
    pageKey: props.params.page || interactions.articles.DEFAULT_PAGE,
    isLoading: interactions.articles.isLoading(state, category, articleKey),
    article: interactions.articles.get(state, category, articleKey),
  };
})
export default class ArticlesScene extends BaseComponent {

  static propTypes = {
    route: PropTypes.shape({
      category: PropTypes.string.isRequired,
    }).isRequired,
    params: PropTypes.shape({
      article: PropTypes.string.isRequired,
      page: PropTypes.string,
    }),
  }

  render() {
    if (this.props.isLoading) return null;
    const page = _.get(this.props.article, this.props.pageKey);
    if (!page) return <NotFound />;

    return (
      <section>
        <Heading level={0}>{page.metadata.title}</Heading>
        <page.default />
      </section>
    );
  }

}
