import * as redux from 'redux';
import combinedReduction from 'combined-reduction';
import thunk from 'redux-thunk';
import { combineInteractions } from 'redux-interactions';
import { routerReducer } from 'react-router-redux';

import * as interactions from './interactions';

export function createRootReducer() {
  return combinedReduction(
    combineInteractions({
      articles: interactions.articles,
    }),
    {
      routing: routerReducer,
    },
  );
}

export function createRootEnhancer() {
  const enhancers = [
    redux.applyMiddleware(
      thunk,
    ),
  ];

  if ('devToolsExtension' in global) {
    enhancers.push(window.devToolsExtension());
  }

  return redux.compose(...enhancers);
}

export function createStore(initialState) {
  return redux.createStore(
    createRootReducer(),
    initialState,
    createRootEnhancer(initialState),
  );
}
