import * as _ from 'lodash';
import { connect } from 'react-redux';
import { PropTypes } from 'react';

import * as articleCategories from '../articles';
import * as interactions from '../interactions';
import { BaseComponent, Button } from '../components';

import Section from './Section';

@connect((state, props) => {
  const category = props.route.category;
  const articleKey = props.params.article;
  return {
    category,
    articleKey,
    categoryKey: props.route.categoryKey,
    pageKey: props.params.page || interactions.articles.DEFAULT_PAGE,
    article: interactions.articles.get(state, category, articleKey),
    isLoading: interactions.articles.isLoading(state, category, articleKey),
  };
})
export default class ArticlesNavigation extends BaseComponent {

  static propTypes = {
    route: PropTypes.shape({
      category: PropTypes.string.isRequired,
      categoryKey: PropTypes.string.isRequired,
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
    let pages;
    if (key === this.props.articleKey && this.props.article) {
      pages = <div>{_.map(this.props.article, this._renderPage)}</div>;
    }

    const path = `/${this.props.categoryKey}/${key}`;
    const title = <Button highlight to={path} title={article.title}>{article.title}</Button>;

    return <Section key={key} title={title}>{pages}</Section>;
  }

  _renderPage = (page, key) => {
    if (key === interactions.articles.DEFAULT_PAGE) return null;
    const title = page.metadata.title;
    const path = `/${this.props.categoryKey}/${this.props.articleKey}/${key}`;
    return <Button key={key} to={path} title={title}>{title}</Button>;
  }

}
