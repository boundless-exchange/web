import 'babel-polyfill';
import 'lodash';
import 'react-addons-shallow-compare';
import 'react-dom';
import * as offlinePluginRuntime from 'offline-plugin/runtime';
import * as React from 'react';

offlinePluginRuntime.install();

// Make React global so that we can use JSX without fear.
global.React = React;
