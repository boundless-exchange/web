import React from 'react';
import look from 'react-look';
import shallowCompare from 'react-addons-shallow-compare';

/**
 * A base component class that most components should inherit.
 */
@look
export default class BaseComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // See https://facebook.github.io/react/docs/shallow-compare.html
    return shallowCompare(this, nextProps, nextState);
  }
}
