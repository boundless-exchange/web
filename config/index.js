import _ from 'lodash';

import variantBase from './variants/_base';

export const VARIANTS = [
  'development',
  'production',
];

// Prefix to all configuration values accepted/generated via env vars.
const ENV_PREFIX = 'config_';

export const current = get(process.env.VARIANT || 'development');

export function get(variant) {
  if (!_.includes(VARIANTS, variant)) {
    throw new Error(`Unknown configuration '${variant}', expected one of ${VARIANTS.join(', ')}`);
  }

  const variantConfig = require(`./variants/${variant}`).default;

  let config = _.merge({}, variantBase, variantConfig, {variant});
  config = _injectOverrides(config);
  config = _evaluateSubstitutions(config, config);

  return config;
}

/**
 * You can override configuration values via the command line by setting
 * environment variables that mirror the key path of a configuration value.
 *
 * Environment variables must be prefixed with `config` and use `_` to seperate
 * nested object keys.  For example, `config_ios_buildDir` maps to
 * `ios.buildDir` in the configuration object.
 */
function _injectOverrides(config) {
  _.each(process.env, (value, key) => {
    if (!_.startsWith(key, ENV_PREFIX)) return;
    const path = key.substr(ENV_PREFIX.length).replace(/_/g, '.');

    // Ensure consistent types
    const valueType = typeof _.get(config, path);
    if (valueType === 'boolean') {
      value = value.toLowerCase();
      value = value === '1' || value === 'true' || value === 'yes' || value === 'y';
    } else if (valueType === 'number') {
      value = parseInt(value);
    }

    _.set(config, path, value);
  });

  return config;
}

/**
 * Replaces occurrences of {{key}} inside string values in the configuration.
 *
 * This allows for semi-dynamic configuration, such as including the {{variant}}
 * via values defined in _base.
 */
function _evaluateSubstitutions(config, value) {
  if (_.isObject(value)) {
    return _.mapValues(value, _evaluateSubstitutions.bind(null, config));
  } else if (_.isArray(value)) {
    return _.map(value, _evaluateSubstitutions.bind(null, config));
  } else if (!_.isString(value)) {
    return value;
  }

  return value.replace(/\{\{(.*?)\}\}/, (_match, key) => _.get(config, key));
}

/**
 * Emits all configuration values in a shell-friendly key=value format.
 *
 * Follows the same rules as `_injectOverrides`, but in reverse.
 */
export function stringifyForShell(config) {
  const flatConfig = flatten(config);
  const lines = _.map(flatConfig, (value, key) => {
    if (value == null) {
      return `${key}=`;
    } else {
      return `${key}=${JSON.stringify(value)}`;
    }
  });
  return lines.join('\n');
}

/**
 * Flattens a nested configuration into key value pairs, where the key is the
 * path to the value separated by `_`.
 */
export function flatten(object, prefix = ENV_PREFIX, separator = '_') {
  const result = {};

  _.each(object, (value, key) => {
    if (_.isPlainObject(value)) {
      Object.assign(result, flatten(value, `${prefix}${key}${separator}`, separator));
    } else {
      result[`${prefix}${key}`] = value;
    }
  });

  return result;
}

/**
 * Flattens configuration into keys with escaped values suitable for webpack's
 * DefinePlugin.
 */
export function defines(object) {
  return _.mapValues(flatten(object, '', '.'), v => JSON.stringify(v));
}
