#!/usr/bin/env ./node_modules/.bin/babel-node
import * as config from '../config';

let result;
if (process.argv.includes('--all')) {
  result = {};
  for (const variant of config.VARIANTS) {
    result[variant] = config.get(variant);
  }
} else {
  result = config.current;
}

console.log(JSON.stringify(result, null, 2));
