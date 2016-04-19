import 'babel-polyfill';
import 'chroma-js';
import 'classlist-polyfill';
import 'combined-reduction';
import 'lodash';
import 'react-addons-shallow-compare';
import 'react-dom';
import 'react-look';
import 'react-redux';
import 'react-router-redux';
import 'react-router';
import 'react-web-animation';
import 'redux-interactions';
import 'redux-thunk';
import 'redux';
import 'svg-inline-react';
import 'web-animations-js/web-animations-next.min.js';
import 'webfontloader';
import * as React from 'react';

import 'box-sizing.css';
import 'normalize.css';
import './assets/fonts/index.css';

// Make React global so that we can use JSX without fear.
global.React = React;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    // Vendor code is global; we can't expect everyone downstream to refresh all
    // their references.
    window.location.reload();
  });
}
