import * as reactDom from 'react-dom';

import Router from './routes';

reactDom.render(<Router />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./routes', () => {
    const NewRouter = require('./routes').default;
    reactDom.render(<NewRouter />, document.getElementById('root'));
  });
}
