import { IndexRoute, Route } from 'react-router';

import * as scenes from './scenes';

function loadWorldBuilderArticles() {
  return new Promise((resolve, _reject) => {
    require.ensure([], require => {
      resolve(require('./articles/world-builder/guide'));
    }, 'world-builder/guide');
  });
}

export function createRoutes() {
  return (
    <Route path='/' component={scenes.Layout}>
      <IndexRoute component={scenes.Splash} />
      <Route path='/world-builder/:article' component={scenes.ArticleCollection} articles={loadWorldBuilderArticles()} />
      <Route path='*' component={scenes.NotFound} />
    </Route>
  );
}
