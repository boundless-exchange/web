import { PropTypes } from 'react';

import BaseComponent from './BaseComponent';

const DEFAULT_PAGE = 'intro';

/**
 * An abstract component class that accepts articles from a <Route>, loads the
 * article that is being routed to, and selects its current page.
 *
 * Subclasses should base their behavior off of component state:
 *
 *   `loading`: Whether articles are being fetched.
 *   `notFound`: Whether the article or page linked to is missing.
 *   `articles`: An object mapping all known article keys to their metadata.
 *   `articleKey`: The current article's path key.
 *   `pages`: The current reactdown-parsed page.
 *   `pageKey`: The current page's path key.
 *
 */
export default class ArticleLoader extends BaseComponent {

  static propTypes = {
    route: PropTypes.shape({
      articles: PropTypes.objectOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        load: PropTypes.func.isRequired,
      })).isRequired,
    }).isRequired,
    params: PropTypes.shape({
      article: PropTypes.string.isRequired,
      page: PropTypes.string,
    }).isRequired,
  }

  constructor(props, ...args) {
    super(props, ...args);

    this.state = {
      loading: true,
      notFound: false,
      articles: props.route.articles,
      articleKey: props.params.article,
      pages: null,
      pageKey: props.params.page || DEFAULT_PAGE,
    };
  }

  componentWillMount() {
    this._loadPage(this.state.articles, this.state.articleKey, this.state.pageKey);
  }

  componentWillReceiveProps(nextProps) {
    const nextState = {
      articles: nextProps.route.articles,
      articleKey: nextProps.params.article,
      pageKey: nextProps.params.page || DEFAULT_PAGE,
    };
    if (this.state.articles === nextProps.articles &&
      this.state.articleKey === nextProps.articleKey &&
      this.state.pageKey === nextProps.pageKey) return;

    this.setState({
      ...nextState,
      loading: true,
      notFound: false,
    });
    this._loadPage(nextState.articles, nextState.articleKey, nextState.pageKey);
  }

  async _loadPage(articles, articleKey, pageKey) {
    if (!articles[articleKey]) {
      this.setState({
        pages: null,
        loading: false,
        notFound: true,
      });
      return;
    }

    // TODO: Deal with errors.
    const pages = await articles[articleKey].load();
    this.setState({
      pages,
      loading: false,
      notFound: !pages[pageKey],
    });
  }

}
