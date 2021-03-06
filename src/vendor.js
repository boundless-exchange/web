import 'babel-polyfill';
import 'bowser';
import 'chroma-js';
import 'classlist-polyfill';
import 'combined-reduction';
import 'deep-update';
import 'lodash';
import 'react-addons-shallow-compare';
import 'react-dom';
import 'react-look';
import 'react-redux';
import 'react-router';
import 'react-router-redux';
import 'react-web-animation';
import 'reactdown/runtime';
import 'redux';
import 'redux-interactions';
import 'redux-thunk';
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
