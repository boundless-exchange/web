import 'babel-polyfill';
import 'lodash';
import 'react-addons-shallow-compare';
import 'react-dom';
import * as React from 'react';

// Make React global so that we can use JSX without fear.
global.React = React;
