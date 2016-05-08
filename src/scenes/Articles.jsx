import * as _ from 'lodash';
import { PropTypes } from 'react';
import { StyleSheet } from 'react-look';
import { connect } from 'react-redux';

import { BaseComponent, Button, Heading, Raised } from '../components';
import { sizes } from '../constants';
import * as interactions from '../interactions';

import NotFound from './NotFound';

const GITHUB_SRC = `https://github.com/boundless-exchange/web/edit/master/src`;

const STYLES = StyleSheet.create({
  root: {
    position: 'relative',
    padding: sizes.SPACING.NORMAL,
    transformStyle: 'preserve-3d',
  },
  controls: {
    position: 'absolute',
    top: 0,
    right: 0,
    transformStyle: 'preserve-3d',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 0,
  },
});

@connect((state, props) => {
  const categoryKey = props.route.categoryKey;
  const articleKey = props.params.article;
  return {
    categoryKey,
    articleKey,
    pageKey: props.params.page || interactions.articles.DEFAULT_PAGE,
    isLoading: interactions.articles.isLoading(state, categoryKey, articleKey),
    article: interactions.articles.get(state, categoryKey, articleKey),
  };
})
export default class ArticlesScene extends BaseComponent {

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
    const {article, articleKey, categoryKey, isLoading, pageKey} = this.props;
    if (isLoading) return null;
    const page = _.get(article, pageKey);
    if (!page) return <NotFound />;

    return (
      <section className={STYLES.root}>
        <div className={STYLES.controls}>
          <Button
            link
            to={`${GITHUB_SRC}/articles/${categoryKey}/${articleKey}/${pageKey}.md`}
            title='Edit on GitHub'
          >
            Edit
          </Button>
        </div>
        <div className={STYLES.content}>
          <Raised depth={1}>
            <Heading level={1}>{page.metadata.title}</Heading>
            <page.default />
          </Raised>
        </div>
      </section>
    );
  }

}
