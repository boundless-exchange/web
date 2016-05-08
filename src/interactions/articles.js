import * as _ from 'lodash';
import deepUpdate from 'deep-update';
import { Interactions, reducer, selector } from 'redux-interactions';

import articleCategories from '../articles';

export default new class ArticleInteractions extends Interactions {

  DEFAULT_PAGE = 'intro';

  initialState = {
    content: {},
    loading: {},
  };

  @selector
  get(scopedState, categoryKey, articleKey) {
    return _.get(scopedState, ['content', categoryKey, articleKey]);
  }

  @selector
  isLoading(scopedState, categoryKey, articleKey) {
    return !!_.get(scopedState, ['loading', categoryKey, articleKey]);
  }

  load(categoryKey, articleKey) {
    return async (dispatch, getState) => {
      const articles = articleCategories[categoryKey]; // eslint-disable-line import/namespace
      if (!articles) {
        throw new TypeError(`Unknown article category: ${categoryKey}`);
      }
      if (!articles[articleKey]) {
        throw new TypeError(`Unknown article: ${categoryKey}/${articleKey}`);
      }
      if (this.get(getState(), categoryKey, articleKey)) return;

      dispatch(this._loading(categoryKey, articleKey, true));
      try {
        const article = await articles[articleKey].load();
        dispatch(this._loaded(categoryKey, articleKey, article));
      } catch (error) {
        dispatch(this._loadFailed(categoryKey, articleKey));
        throw error;
      }
    };
  }

  @reducer
  _loading(scopedState, categoryKey, articleKey) {
    return deepUpdate(scopedState, ['loading', categoryKey, articleKey], {$set: true});
  }

  @reducer
  _loaded(scopedState, categoryKey, articleKey, article) {
    scopedState = deepUpdate(scopedState, ['loading', categoryKey, articleKey], {$set: false});
    return deepUpdate(scopedState, ['content', categoryKey, articleKey], {$set: article});
  }

  @reducer
  _loadFailed(scopedState, categoryKey, articleKey) {
    return deepUpdate(scopedState, ['loading', categoryKey, articleKey], {$set: false});
  }

};
