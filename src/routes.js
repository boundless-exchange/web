/* eslint-disable react/jsx-no-bind */
import { IndexRoute, Route } from 'react-router';

import * as scenes from './scenes';

export function createRoutes() {
  return (
    <Route path='/' component={scenes.Layout}>
      <IndexRoute component={scenes.Splash} />
      <Route path='/world-builder/guide/:article' component={scenes.Articles} />
      <Route path='*' component={scenes.NotFound} />
    </Route>
  );
}
