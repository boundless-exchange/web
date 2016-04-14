import * as reactDom from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { createStore } from './store';

// Singletons
const store   = createStore();
const history = syncHistoryWithStore(browserHistory, store);

// Application Entry
function renderRoot() {
  const routes = require('./routes').createRoutes();
  const root = (
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  );
  reactDom.render(root, document.getElementById('root'));
}
renderRoot();

// Hot Reloading
if (module.hot) {
  // We can hot reload reducers, but not the store itself (yet). This is
  // because <Provider>, @connect do not check for context updates.
  module.hot.accept('./store', () => {
    store.replaceReducer(require('./store').createRootReducer());
  });

  module.hot.accept('./routes', () => {
    // react-router doesn't support hot reloading yet; so we've got to blow it
    // all away.
    reactDom.unmountComponentAtNode(document.getElementById('root'));
    renderRoot();
  });
}
