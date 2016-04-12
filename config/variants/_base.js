import * as path from 'path';

const ROOT_DIR = path.resolve(__dirname, '..', '..');

/**
 * Base configuration that all variants extend.
 */
export default {

  // Debugging

  // Whether the project should be (hot) reloaded when source files change.
  watch: false,

  // Pathing

  rootDir: ROOT_DIR,
  buildDir: path.join(ROOT_DIR, 'build'),
  srcDir: path.join(ROOT_DIR, 'src'),

};
