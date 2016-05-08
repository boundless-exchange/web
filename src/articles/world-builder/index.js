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
    return Promise.reject(new Error(`Not implemented yet`));
  },
};

export const techniques = {
  title: `Techniques`,
  load() {
    return Promise.reject(new Error(`Not implemented yet`));
  },
};
