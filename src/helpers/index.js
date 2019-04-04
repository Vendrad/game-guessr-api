'use strict';

export function randBetweenInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}