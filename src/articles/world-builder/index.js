export const guide = {
  title: `Guide`,
  load() {
    return new Promise((resolve, _reject) => {
      require.ensure([], require => {
        resolve(require('./guide').default);
      }, 'world-builder/guide');
    });
  },
};

export const reference = {
  title: `Reference`,
  load() {
    return new Promise((resolve, _reject) => {
      require.ensure([], require => {
        resolve(require('./reference').default);
      }, 'world-builder/reference');
    });
  },
};

export const techniques = {
  title: `Techniques`,
  load() {
    return new Promise((resolve, _reject) => {
      require.ensure([], require => {
        resolve(require('./techniques').default);
      }, 'world-builder/techniques');
    });
  },
};
