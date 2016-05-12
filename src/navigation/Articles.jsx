import * as _ from 'lodash';
import { connect } from 'react-redux';
import { PropTypes } from 'react';
import { StyleSheet } from 'react-look';

import * as interactions from '../interactions';
import articleCategories from '../articles';
import { BaseComponent, Button } from '../components';

import Section from './Section';

const STYLES = StyleSheet.create({
  root: {
    transformStyle: 'preserve-3d',
  },
});

@connect((state, props) => {
  const categoryKey = props.route.categoryKey;
  const articleKey = props.params.article;
  return {
    categoryKey,
    articleKey,
    pageKey: props.params.page || interactions.articles.DEFAULT_PAGE,
    article: interactions.articles.get(state, categoryKey, articleKey),
    isLoading: interactions.articles.isLoading(state, categoryKey, articleKey),
  };
})
export default class ArticlesNavigation extends BaseComponent {

  static propTypes = {
    route: PropTypes.shape({
      categoryKey: PropTypes.string.isRequired,
    }).isRequired,
    params: PropTypes.shape({
      article: PropTypes.string.isRequired,
      page: PropTypes.string,
    }),
  }

  render() {
    const articles = articleCategories[this.props.categoryKey]; // eslint-disable-line import/namespace
    return <div className={STYLES.root}>{_.map(articles, this._renderArticle)}</div>;
  }

  _renderArticle = (article, key) => {
    let pages;
    if (key === this.props.articleKey && this.props.article) {
      pages = _.map(this.props.article, this._renderPage);
    }

    const path = `/${this.props.categoryKey}/${key}`;
    const title = <Button navigation highlight to={path} title={article.title} shadowDepth={1}>{article.title}</Button>;

    return <Section key={key} title={title}>{pages}</Section>;
  }

  _renderPage = (page, key) => {
    if (key === interactions.articles.DEFAULT_PAGE) return null;
    const title = page.metadata.title;
    const path = `/${this.props.categoryKey}/${this.props.articleKey}/${key}`;
    return <Button navigation key={key} to={path} title={title}>{title}</Button>;
  }

}
