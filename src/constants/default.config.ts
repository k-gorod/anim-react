/* eslint-disable import/prefer-default-export */

import { AnimConfigType } from "../types";

export const defaultAnimConfig: AnimConfigType = {
  keyframes: [
    { opacity: 1 },
    { opacity: 0 },
    { opacity: 1 },
  ],
  isActive: true,
  finished: false,
  delay: 0,
  direction: 'normal',
  duration: 1000,
  easing: 'linear',
  endDelay: 0,
  iterationStart: 0,
  iterations: Infinity,
  //   fill: 'forwards',
  /*
      iterationComposite: 'accumulate',
      composite: 'accumulate',
      spacing: 'distribute'
      */
};
