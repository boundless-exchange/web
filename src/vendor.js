import 'babel-polyfill';
import 'chroma-js';
import 'classlist-polyfill';
import 'combined-reduction';
import 'lodash';
import 'normalize.css';
import 'react-addons-shallow-compare';
import 'react-dom';
import 'react-look';
import 'react-router-redux';
import 'react-router';
import 'redux-interactions';
import 'redux-thunk';
import 'react-redux';
import 'redux';
import * as React from 'react';

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
