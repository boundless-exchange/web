import * as _ from 'lodash';
import { PropTypes } from 'react';
import { StyleSheet } from 'react-look';
import { connect } from 'react-redux';

import { BaseComponent, Button, Raised } from '../components';
import { sizes } from '../constants';
import { Heading } from '../components/Articles';
import * as interactions from '../interactions';

import NotFound from './NotFound';

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
  },
});

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
      <section className={STYLES.root}>
        <div className={STYLES.controls}>
          <Button
            link
            to='https://github.com/boundless-exchange/web/edit/master/src/articles/world-builder/guide/biomes.md'
            title='Edit on GitHub'
          >
            Edit
          </Button>
        </div>
        <div className={STYLES.content}>
          <Raised depth={1}>
            <Heading level={0}>{page.metadata.title}</Heading>
            <page.default />
          </Raised>
        </div>
      </section>
    );
  }

}
