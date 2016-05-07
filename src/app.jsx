import * as reactDom from 'react-dom';
import webfontloader from 'webfontloader';
import { LookRoot } from 'react-look';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { createStore } from './store';

// Singletons
const store   = createStore();
const history = syncHistoryWithStore(browserHistory, store);

// Application Entry
loadFonts()
  .then(renderRoot);

function renderRoot() {
  const routes      = require('./routes').createRoutes(store);
  const styleConfig = require('./styleConfig').default;

  const root = (
    <LookRoot config={styleConfig}>
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    </LookRoot>
  );
  reactDom.render(root, document.getElementById('root'));
}

function loadFonts() {
  return new Promise((resolve, _reject) => {
    webfontloader.load({
      timeout: 2500,
      active: resolve,
      inactive: resolve,
      custom: {
        // See ./assets/fonts/index.css
        families: [
          'Fela-Light',
          'Lato-Bold',
          'Lato-BoldItalic',
          'Lato-Italic',
          'Lato-Regular',
        ],
      },
    });
  });
}

function reloadRoot() {
  // react-router doesn't support hot reloading yet; so we've got to blow it
  // all away.
  reactDom.unmountComponentAtNode(document.getElementById('root'));
  resetStyles();
  renderRoot();
}

function resetStyles() {
  const style = document.getElementById('component-styles');
  for (let rule = style.sheet.cssRules[0]; rule; rule = style.sheet.cssRules[0]) {
    style.sheet.deleteRule(rule);
  }
  style.textContent = '';
}

// Hot Reloading
if (module.hot) {
  // We can hot reload reducers, but not the store itself (yet). This is
  // because <Provider>, @connect do not check for context updates.
  module.hot.accept('./store', () => {
    store.replaceReducer(require('./store').createRootReducer());
  });

  module.hot.accept('./routes', reloadRoot);
  module.hot.accept('./styleConfig', reloadRoot);
}
