import * as reactDom from 'react-dom';

import { App } from './scenes';

reactDom.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./scenes', () => {
    const NewApp = require('./scenes').App;
    reactDom.render(<NewApp />, document.getElementById('root'));
  });
}
