import * as _ from 'lodash';
import { PropTypes } from 'react';
import { StyleSheet } from 'react-look';
import { connect } from 'react-redux';

import { BaseComponent, Button, Heading, Notice, Raised } from '../components';
import { sizes } from '../constants';
import * as interactions from '../interactions';

import NotFound from './NotFound';

const GITHUB_SRC = `https://github.com/boundless-exchange/web/blob/master/src`;

const STYLES = StyleSheet.create({
  root: {
    position: 'relative',
  },
  controls: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  controlSpacer: {
    flex: 1,
  },
  title: {
    whiteSpace: 'nowrap',
    padding: sizes.SPACING.NORMAL,
    paddingBottom: 0,
  },
  notice: {
    padding: sizes.SPACING.NORMAL,
    paddingTop: sizes.SPACING.NORMAL * 2,
    paddingBottom: 0,
  },
  content: {
    position: 'relative',
    padding: sizes.SPACING.NORMAL,
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
      <div className={STYLES.root}>
        <div className={STYLES.controls}>
          <Raised depth={1} className={STYLES.title}>
            <Heading level={1}>{page.metadata.title}</Heading>
          </Raised>
          <div className={STYLES.controlSpacer} />
          <Button
            link
            to={`${GITHUB_SRC}/articles/${categoryKey}/${articleKey}/${pageKey}.md`}
            title='Edit on GitHub'
          >
            Edit
          </Button>
        </div>
        {page.metadata.notice &&
          <Raised depth={2} className={STYLES.notice}>
            <Notice type={page.metadata.notice} />
          </Raised>
        }
        <Raised depth={1} className={STYLES.content}>
          <page.default />
        </Raised>
      </div>
    );
  }

}
