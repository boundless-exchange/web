import * as _ from 'lodash';
import { connect } from 'react-redux';
import { PropTypes } from 'react';

import * as articleCategories from '../articles';
import * as interactions from '../interactions';
import { BaseComponent } from '../components';

import Section from './Section';

@connect((state, props) => {
  const category = props.route.category;
  const articleKey = props.params.article;
  return {
    category,
    articleKey,
    pageKey: props.params.page || interactions.articles.DEFAULT_PAGE,
    article: interactions.articles.get(state, category, articleKey),
    isLoading: interactions.articles.isLoading(state, category, articleKey),
  };
})
export default class ArticlesNavigation extends BaseComponent {

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
    const articles = articleCategories[this.props.category]; // eslint-disable-line import/namespace
    return <div>{_.map(articles, this._renderArticle)}</div>;
  }

  _renderArticle = (article, key) => {
    return <Section key={key} title={article.title} />;
  }

}
