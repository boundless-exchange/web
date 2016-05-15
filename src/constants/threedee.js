import * as bowser from 'bowser';

// Different browsers have varying levels of support for 3d transforms.
//
// The unfortunate truth is that we need to browser sniff to set up the correct
// behavior (or approximation) we can.

// Whether rotation should be allowed (e.g. during mouse movement).
export let ROTATION = true;
// Whether perspective transforms are expensive to calculate.
export let EXPENSIVE_PERSPECTIVE = false;

// WebKit (Safari)

if (bowser.webkit && !bowser.blink) {
  // WebKit doesn't calculate transform-origin and perspective-origin correctly
  // when both are specified.  We prefer perspective.}
  ROTATION = false;
}

// Gecko (Firefox)

if (bowser.gecko) {
  // Rotation completely screws up gecko's calculation of the document size.
  // You end up getting horizontal scroll bars all over the place.
  ROTATION = false;
  // Updating perspective-origin on Gecko is extremely expensive.
  EXPENSIVE_PERSPECTIVE = true;
}
