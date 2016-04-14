import * as path from 'path';

const ROOT_DIR = path.resolve(__dirname, '..', '..');

/**
 * Base configuration that all variants extend.
 */
export default {

  // Debugging & Optimization

  // Whether the project and its dependencies should be in "debug mode".
  debug: false,
  // Whether the project should be (hot) reloaded when source files change.
  watch: false,
  // Whether the built output should be optimized (minimized)
  optimize: false,

  // Deployment

  // The Firebase project to deploy to.
  firebaseProject: null,

  // Pathing

  rootDir: ROOT_DIR,
  buildDir: path.join(ROOT_DIR, 'build', '{{variant}}'),
  srcDir: path.join(ROOT_DIR, 'src'),

};
