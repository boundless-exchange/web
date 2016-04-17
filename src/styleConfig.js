// Configuration for react-look.
//
// References:
//
//   * https://github.com/rofrischmann/react-look/blob/develop/packages/react-look/docs/guides/configureLook.md
//   * https://github.com/rofrischmann/react-look/blob/develop/packages/react-look/modules/presets/react-dom.js
//
import _ from 'lodash';
import { DynamicPrefixer, Mixins, Plugins } from 'react-look';

export default {

  styleElementId: 'component-styles',

  prefixer: new DynamicPrefixer(),

  plugins: _.compact([
    Plugins.statefulValue,
    Plugins.statefulSelector,
    Plugins.mixin,
    Plugins.fallbackValue,
    // Not consistent; see https://github.com/rofrischmann/react-look/issues/257
    Plugins.friendlyClassName,
  ]),

  // Configuration for Plugins.mixin
  mixins: {
    // Conditions
    // NOTE: Condition order matters
    '>=': Mixins.greaterThan,
    '<=': Mixins.lessThan,
    '!=': Mixins.unEqual,
    '>':  Mixins.greater,
    '<':  Mixins.less,
    '=':  Mixins.equal,

    // Other
    'extend':   Mixins.extend,
    'contains': Mixins.contains,
    'substr':   Mixins.substr,

    // CSS extraction
    'css': Mixins.extractCSS,

    // Queries
    '@platform': Mixins.platformQuery,
  },

};
