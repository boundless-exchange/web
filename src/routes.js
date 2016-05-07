import { Redirect, Route } from 'react-router';

import * as scenes from './scenes';
import * as navigation from './navigation';
import * as interactions from './interactions';

export function createRoutes(store) {
  return (
    <Route component={scenes.Layout}>
      <Redirect from='/' to='world-builder/guide' />
      <Route
        path='world-builder/:article(/:page)'
        components={{navigation: navigation.Articles, scene: scenes.Articles}}
        category='worldBuilder'
        onEnter={_loadArticle.bind(null, store, 'worldBuilder')}
      />
      <Route path='*' component={scenes.NotFound} />
    </Route>
  );
}

function _loadArticle(store, category, nextState) {
  const {params: {article}} = nextState;
  store.dispatch(interactions.articles.load(category, article));
}
