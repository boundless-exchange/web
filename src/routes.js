import {
  browserHistory,
  IndexRoute,
  Router,
  Route,
} from 'react-router';

import * as scenes from './scenes';

export default function routes() {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={scenes.App}>
        <IndexRoute component={scenes.Splash} />
        <Route path='*' component={scenes.NotFound} />
      </Route>
    </Router>
  );
}
