import * as _ from 'lodash';

import { ArticleLoader } from '../components';

import Section from './Section';

export default class Articles extends ArticleLoader {

  render() {
    return <div>{_.map(this.state.articles, this._renderArticle)}</div>;
  }

  _renderArticle = (article, key) => {
    return <Section key={key} title={article.title} />;
  }

}
