import * as _ from 'lodash';
import deepUpdate from 'deep-update';
import { Interactions, reducer, selector } from 'redux-interactions';

import * as articleCategories from '../articles';

export default new class ArticleInteractions extends Interactions {

  DEFAULT_PAGE = 'intro';

  initialState = {
    content: {},
    loading: {},
  };

  @selector
  get(scopedState, category, articleKey) {
    return _.get(scopedState, ['content', category, articleKey]);
  }

  @selector
  isLoading(scopedState, category, articleKey) {
    return !!_.get(scopedState, ['loading', category, articleKey]);
  }

  load(category, articleKey) {
    return async (dispatch, getState) => {
      const articles = articleCategories[category]; // eslint-disable-line import/namespace
      if (!articles) {
        throw new TypeError(`Unknown article category: ${category}`);
      }
      if (!articles[articleKey]) {
        throw new TypeError(`Unknown article: ${category}/${articleKey}`);
      }
      if (this.get(getState(), category, articleKey)) return;

      dispatch(this._loading(category, articleKey, true));
      try {
        const article = await articles[articleKey].load();
        dispatch(this._loaded(category, articleKey, article));
      } catch (error) {
        dispatch(this._loadFailed(category, articleKey));
        throw error;
      }
    };
  }

  @reducer
  _loading(scopedState, category, articleKey) {
    return deepUpdate(scopedState, ['loading', category, articleKey], {$set: true});
  }

  @reducer
  _loaded(scopedState, category, articleKey, article) {
    scopedState = deepUpdate(scopedState, ['loading', category, articleKey], {$set: false});
    return deepUpdate(scopedState, ['content', category, articleKey], {$set: article});
  }

  @reducer
  _loadFailed(scopedState, category, articleKey) {
    return deepUpdate(scopedState, ['loading', category, articleKey], {$set: false});
  }

};
