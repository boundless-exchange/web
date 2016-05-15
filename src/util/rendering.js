import * as _ from 'lodash';

export function throttle(milliseconds = 0) {
  let throttleFunc;
  if (milliseconds <= 0) {
    throttleFunc = requestAnimationFrame;
  } else {
    throttleFunc = callback => setTimeout(callback, milliseconds);
  }

  return function throttleDecorator(_target, name, descriptor) {
    const method = descriptor.value;
    if (!_.isFunction(method)) {
      throw new TypeError(`@throttle must decorate a method`);
    }

    const ranLock = `_throttle_${name}_ranThisFrame`;
    const staleArgs = `_throttle_${name}_staleArgs`;

    function throttledMethod(...args) {
      if (this[ranLock]) {
        this[staleArgs] = args;
        return;
      }

      this[ranLock] = true;
      throttleFunc(() => {
        this[ranLock] = false;
        if (this[staleArgs]) {
          const latestArgs = this[staleArgs];
          this[staleArgs] = null;
          throttledMethod.apply(this, latestArgs);
        }
      });

      method.apply(this, args);
    }

    descriptor.value = throttledMethod;
  };
}
