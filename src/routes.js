import { Redirect, Route } from 'react-router';

import * as scenes from './scenes';
import * as navigation from './navigation';
import * as articles from './articles';

export function createRoutes() {
  return (
    <Route component={scenes.Layout}>
      <Redirect from='/' to='world-builder/guide/intro' />
      <Route
        path='world-builder/:article(/:page)'
        components={{navigation: navigation.Articles, scene: scenes.Articles}}
        articles={articles.worldBuilder}
      />
      <Route path='*' component={scenes.NotFound} />
    </Route>
  );
}
